catch (error: unknown) {
  if (error instanceof Error) {
    // Now TypeScript knows error is an instance of Error
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  } else {
    // If error is not an instance of Error, handle it gracefully
    console.error('Unknown error occurred:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
