const Workout = require("../models/workoutModel")
const mongoose = require("mongoose")

const getWorkouts = async (req, res) => {
	const user_id = req.user._id
	const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 })

	res.status(200).json({ workouts })
}

const createWorkout = async (req, res) => {
	const user_id = req.user._id
	const { title, reps, load } = req.body

	try {
		const workout = await Workout.create({ title, reps, load, user_id })
		res.status(200).json({ workout })
	} catch (err) {
		res.status(400).json({ err })
	}
}

const getSingleWorkout = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ err: "Invalid ID" })
	}
	const workout = await Workout.findById(id)

	if (!workout) {
		return res.status(404).json({ err: "No such workout exists" })
	}

	res.status(200).json({ workout })
}

const updateWorkout = async (req, res) => {


	const { title, reps, load } = req.body
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ err: "Invalid ID" })
	}

	try {
		const workout = await Workout.findByIdAndUpdate(id,{title,reps,load},{new:true})
		res.status(200).json({ workout })
	} catch (err) {
		console.log(err)
		res.status(400).json({ err })
	}

}

const deleteWorkout = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ err: "Invalid ID" })
	}


	await Workout.findOneAndDelete(id)

	res.status(200).json({msg:"Workout Deleted Succesfully"})
}

module.exports =
	{getWorkouts, createWorkout, getSingleWorkout, deleteWorkout, updateWorkout}
