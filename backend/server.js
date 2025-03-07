require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const helmet = require("helmet")
const compression = require("compression")
const workoutRoutes = require("./routes/workouts")
const userRoutes = require("./routes/user")
const cors = require("cors")

const app = express()

// Security middlewares
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(cors({
	origin:process.env.URL
}))

app.use((req, res, next) => {
	console.log(req.path, req.method)
	next()
})

app.get("/", (req, res) => {
	res.json({ msg: "OK" })
})

app.use("/api/workouts", workoutRoutes)
app.use("/api/user", userRoutes)

mongoose.connect(process.env.MONGO_URI)
.then((result) => {
		console.log("connected to DB")
		app.listen(process.env.PORT,() => {
			console.log(`Listening to PORT ${process.env.PORT}`)
		})
})
.catch((err) => {
		console.log(err)
})
