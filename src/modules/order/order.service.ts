import { ConflictException, Injectable } from '@nestjs/common';
import { CartdbService } from '../../../DB/Cart/cartdb/cartdb.service';
import { OrderdbService } from '../../../DB/Order/orderdb/orderdb.service';
import Stripe from 'stripe';
import { DrugdbService } from 'DB/Drug/drugdb/drugdb.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly _ordermodel: OrderdbService,
    private readonly _cartModel: CartdbService,
    private readonly _drugModel: DrugdbService,
  ) {}

  async createOrder(body: any, req: any) {
    const user = req.user._id;
    const cart = await this._cartModel.findOneAndPopulate({ user });

    if (cart.drug.length < 1) throw new ConflictException('Cart is empty');

    for (const e of cart.drug) {
      const drug = await this._drugModel.findById(e.drugId);
      if (e.quantity > drug.quantity) {
        throw new ConflictException(
          `Sorry, Only ${drug.quantity} available of ${drug.name}`,
        );
      }
    }

    const order: any = {
      user,
      drug: cart.drug,
      address: body.address,
      phone: body.phone,
      price: cart['totalPrice'],
      payment: body.payment,
    };

    const Order = await this._ordermodel.create(order);

    //send email and update stock

    if (body.payment == 'visa') {
      const stripe = new Stripe(process.env.Stripe_key);

      const seisson = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        metadata: { order_id: Order['_id'].toString() },
        line_items: cart.drug.map((e) => ({
          price_data: {
            currency: 'EGP',
            product_data: {
              name: e.drugId.name,
              images: e.drugId.image ? [e.drugId.image.url] : [],
            },
            unit_amount: e.drugId.price * 100,
          },
          quantity: e.quantity,
        })),
        success_url: process.env.success_url,
        cancel_url: process.env.cancel_url,
      });

      return { message: 'Done', link: seisson.url };
    }
    await this._cartModel.findOneAndUpdate({ user }, { drug: [] });
    return { message: 'Done' };
  }

  async webhook(req: any) {
    // This is your Stripe CLI webhook secret for testing your endpoint locally.
    const endpointSecret = process.env.EndPointSecret;

    const stripe = new Stripe(process.env.Stripe_key);

    const sig = req.headers['stripe-signature'];

    let event: any;

    try {
      event = stripe.webhooks.constructEvent(
        req['rawBody'],
        sig,
        endpointSecret,
      );
    } catch (err) {
      return { message: `Webhook Error: ${err.message}`, err };
    }

    let order: any;
    // Handle the event
    if (event.type === 'checkout.session.completed') {
      order = await this._ordermodel.findOneAndUpdate(
        { _id: event.data.object.metadata.order_id },
        { status: 'Paid' },
      );

      order.drug.forEach(async (e) => {
        await this._drugModel.findByIdAndUpdate(e.drugId, {
          $inc: { quantity: -e.quantity },
        });
      });

      await this._cartModel.findOneAndUpdate(
        { user: order.user },
        { drug: [] },
      );
    }

    // Return a 200 response to acknowledge receipt of the event
    return { order };
  }

  async orders(req: any) {
    return await this._ordermodel.find({ user: req.user._id, status: 'Paid' });
  }
}
