import { transporter } from "@/helper/nodemailer/nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, username, emailSubject, emailBody } = req.body;
    if (!email || !username || !emailSubject || !emailBody) {
      return res.status(400).json({ message: "BAD REQUEST" });
    }
    console.log(email);
    //check email validate
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    try {
      let info = await transporter.sendMail({
        to: "sourav.ahmed5654@gmail.com",
        from: email,
        subject: "EMAIL_FROM_PORTFOLIO: " + emailSubject,
        text: emailBody + "++" + email,
        html: `<div><h2>${emailSubject}</h2>
        <hr />
        <p>${emailBody}</p>
        <hr />
        <p style="color:red;">${email}</p>
        </div>
        `,
      });
      res.status(200).json({ message: "Email sent successfully" });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  if (req.method === "OPTIONS") {
    return res.status(200).send("ok");
  }
}
