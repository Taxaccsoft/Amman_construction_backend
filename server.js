const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Transporter (App Mail Login)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "queryadon@gmail.com",   // sender mail
    pass: "glxx jprz hesb bafm",   // app password
  },
});

// ✅ API
app.post("/send-mail", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // ✅ Mail sent FROM app mail TO recipient mail
    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,  // sender = app mail
      to: process.env.TO_EMAIL,                       // receiver
      replyTo: email,                                // reply goes to user
      subject: subject || "New Contact Message",

      html: `
        <div style="font-family:Poppins;padding:20px">
          <h2 style="color:#2e8bc0;">📩 New Message from Website</h2>

          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>

          <div style="margin-top:10px;padding:15px;background:#f4f9ff;border-radius:6px">
            ${message}
          </div>

          <br/>
          <p style="font-size:12px;color:gray;">
            This mail was sent from your website contact form.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Mail sent successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Mail failed" });
  }
});

// start server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
