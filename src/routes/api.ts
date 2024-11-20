// src/routes/api.ts
router.post('/services', async (req: Request, res: Response) => {
  const { userId, name, description, price }: ServiceCreationAttributes = req.body; // Use 'name' instead of 'title'

  try {
    // Check if the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const service = await Service.create({
      name,  // Use 'name' instead of 'title'
      description,
      price,
      userId,
    });

    // Return the newly created service
    return res.status(201).json(service);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});
