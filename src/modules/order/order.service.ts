import { ConflictException, Injectable } from '@nestjs/common';
import { CartdbService } from '../../../DB/Cart/cartdb/cartdb.service';
import { OrderdbService } from '../../../DB/Order/orderdb/orderdb.service';
import Stripe from 'stripe';

@Injectable()
export class OrderService {
  constructor(
    private readonly _ordermodel: OrderdbService,
    private readonly _cartModel: CartdbService,
  ) {}

  async createOrder(body: any, req: any) {
    const user = req.user._id;
    const cart = await this._cartModel.findOneAndPopulate({ user });

    if (cart.drug.length < 1) throw new ConflictException('Cart is empty');

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
            },
            unit_amount: e.drugId.price * 100,
          },
          quantity: e.quantity,
        })),
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel',
      });

      await this._cartModel.findOneAndUpdate({ user }, { drug: [] });
      return { message: 'Done', link: seisson.url };
    }
    await this._cartModel.findOneAndUpdate({ user }, { drug: [] });
    return { message: 'Done' };
  }

  async webhook(req: any, response: any) {
    // This is your Stripe CLI webhook secret for testing your endpoint locally.
    const endpointSecret = process.env.EndPointSecret;

    const stripe = new Stripe(process.env.Stripe_key);

    const sig = req.headers['stripe-signature'];

    let event: any;

    console.log(endpointSecret, req.body, sig);

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      return { message: `Webhook Error: ${err.message}` };
    }

    let order: any;
    // Handle the event
    if (event.type === 'checkout.session.completed') {
      order = await this._ordermodel.findOneAndUpdate(
        { _id: event.data.object.metadata.order_id },
        { status: 'Paid' },
      );
    }
    console.log(order);

    // Return a 200 response to acknowledge receipt of the event
    response.send({ order });
  }

  async orders(req: any) {
    return await this._ordermodel.find({ user: req.user._id, status: 'Paid' });
  }
}
