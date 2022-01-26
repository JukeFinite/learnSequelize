const router = require('express').Router();
const User = require('../../../models/User');
// Create user   /api/users
router.post('/', async (req, res) => {
	const {
		username,
		email,
		password,
	} = req.body;
	if (!username || !email || !password) {
		return res.status(400).json({ error: 'You must provider username, password, and email'});
	}
	try {
		const newUser = await User.create({
			username,
			email,
			password
		});
		res.json(newUser);
	} catch (e) {
		console.log(e);
		res.json(e);
	}
});
// Get all users
router.get('/', async (req, res) => {
	try {
		const users = await User.findAll();
		res.json(users);
	} catch (e) {
		console.log(e);
		res.json(e);
	}
});
// endpoint is a GET request to get a user by their primary key
router.get('/:userId', async (req, res) => {
	try {
		const user = await User.findByPk(req.params.userId);
		res.json(user);
	} catch (e) {
		res.json(e);
	}
});
router.patch('/:userId', async (req, res) => {
	const {
		username,
		email,
		password,
	} = req.body;
	try {
		await User.update(
			{
				username,
				email,
				password,
			},
			{
				where: {
					id: req.params.userId,
				}
			}
		);
		const user = await User.findByPk(req.params.userId);
		res.json(user);
	} catch (e) {
		res.json(e);
	}
});
router.delete('/:userId', async (req, res) => {
	try {
		const deletedUser = await User.findByPk(req.params.userId);
		await User.destroy({
			where: {
				id: req.params.userId,
			}
		});
		res.json(deletedUser);
	} catch (e) {
		res.json(e);
	}
});
/*
* 1.
* 2.  endpoint is a PATCH request to update a user by their primary key, this should respond back with the updated user data
* 3.  endpoint is a DELETE request to delete a user by their primary key, this should respond back with the deleted user data
* */
module.exports = router;
