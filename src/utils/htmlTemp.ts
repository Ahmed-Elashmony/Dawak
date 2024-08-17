export const confirmTemp = (link: string) => `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body
    style="
      font-family: Arial, sans-serif;
      background-color: #f7f7f7;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    "
  >
    <div
      class="container"
      style="
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        text-align: center;
        padding: 40px;
        max-width: 470px;
        margin: auto;
      "
    >
      <div>
        <img
          src="https://elearningtest123.blob.core.windows.net/upload/Mail.png"
          alt="mail icon"
          style="max-width: 100%; height: auto"
        />
      </div>

      <h1 style="color: #000; font-size: 24px; margin-top: 0">
        Email Confirmation
      </h1>

      <p style="color: #555; font-size: 16px; margin: 10px 0">
        We are delighted to welcome you, and we're excited that you've chosen us as your partner. 
        This is the first step towards unlocking new opportunities.
      </p>

      <p style="color: #555; font-size: 16px; margin: 10px 0">
        To get started, please confirm your email address by clicking the button
        below.
      </p>

      <a
        href="${link}"
        style="
          display: inline-block;
          background-color: #007d53;
          color: #fff;
          padding: 10px 20px;
          text-decoration: none;
          border-radius: 5px;
          font-size: 18px;
          margin-top: 20px;
        "
        >Confirm Account</a
      >
    </div>
  </body>
</html>`;
