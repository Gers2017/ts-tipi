import Express from "express";
const app = Express();
const PORT = process.env.PORT || 8080;

app.get("/", (_req, res) => {
  res.send("Hello Typescript!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});
