// Interface for the registration body
interface RegisterBody {
    username: string;
    email: string;
    password: string;
    firstName: string;  // Made required
    lastName: string;   // Made required
}

// In the route
router.post('/register', async (req: Request<{}, {}, RegisterBody>, res: Response) => {
    const { username, email, password, firstName, lastName } = req.body;

    try {
        // Ensure firstName and lastName are non-null strings
        if (!firstName || !lastName) {
            return res.status(400).json({ message: 'First and last name are required' });
        }

        // Check if the user already exists (checking by both username and email)
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        const existingEmail = await User.findOne({ where: { email } });
        if (existingEmail) {
            return res.status(400).json({ message: 'Email is already taken' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with default 'Free' role and 'Inactive' subscription status
        const user = await User.create({
            username,
            email,
            password: hashedPassword,  // Store the hashed password
            firstName,
            lastName,
            role: 'Free',  // Default to "Free" role
            subscriptionStatus: 'Inactive',  // Default to "Inactive"
        });

        // Respond with user details excluding password
        res.status(201).json({
            id: user.id,
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            subscriptionStatus: user.subscriptionStatus,
        });
    } catch (error) {
        console.error('Error during registration:', error.message);
        res.status(500).json({ message: 'Server error during registration' });
    }
});
