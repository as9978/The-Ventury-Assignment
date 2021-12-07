export default (req, res) => {
  const { joke, emails } = req.body;

  console.log("Here we can use nodemailer to send joke to provided emails,");
  console.log("Joke : " + joke);
  console.log("Emails : ");
  emails.map((email) => console.log(email));

  res.statusCode = 200;
  res.json({ name: "John Doe" });
};
