import express from "express";
import cors from "cors";
import { jwt } from "../middleware/jwt.middleware";
import { authRouter } from "../routes/auth.routes";
import { voteRouter } from "../routes/vote.route";
import { pollRouter } from "../routes/poll.route";
import { userRouter } from "../routes/user.routes";
import { optionRouter } from "../routes/option.routes";
const app = express();

app.use(cors());

app.use(express.json());

app.use("/auth", authRouter);
app.use("/vote", jwt, voteRouter);
app.use("/poll", jwt, pollRouter);
app.use("/user", jwt, userRouter);
app.use("/option", jwt, optionRouter);
export { app };
