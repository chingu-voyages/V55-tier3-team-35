export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  console.log('registerUser function called');
  console.log('Request body:', JSON.stringify(req.body, null, 2));
  console.log('Request origin:', req.headers.origin);
  console.log('Request headers:', req.headers);

  try {
    console.log('Starting validation...');
    const validationResult = registerSchema.safeParse(req.body);

    if (!validationResult.success) {
      console.error('Validation failed:', validationResult.error.issues);
      res.status(400).json({
        message: 'Invalid input',
        errors: validationResult.error.issues,
      });
      return;
    }

    console.log('Validation passed');
    const { username, password } = validationResult.data;
    const existingUser = await prisma.users.findUnique({
      where: { username },
      select: { id: true },
    });

    if (existingUser) {
      console.log('User already exists:', username);
      res.status(409).json({ message: 'Username already taken.' });
      return;
    }

    console.log('User does not exist, proceeding with creation');
    console.log('Hashing password...');
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);
    console.log('Password hashed successfully');

    console.log('Creating new user...');
    const newUser = await prisma.users.create({
      data: {
        username,
        password_hash,
      },
      select: {
        id: true,
        username: true,
        created_at: true,
        default_currency_id: true,
      },
    });
    console.log('New user created:', {
      id: newUser.id,
      username: newUser.username,
    });

    console.log('Fetching template categories...');
    const templateCategories = await prisma.category_templates.findMany();
    console.log('Found template categories count:', templateCategories.length);

    if (!templateCategories.length) {
      console.error('No template categories found');
      throw new Error('No template categories found.');
    }

    console.log('Creating user categories...');
    const userCategoryData = templateCategories.map((template) => ({
      name: template.name,
      is_user_created: false,
      user_id: newUser.id,
    }));

    const createdCategories = await prisma.categories.createMany({
      data: userCategoryData,
    });
    console.log('Created categories count:', createdCategories.count);

    if (createdCategories.count != templateCategories.length) {
      console.warn(
        `Expected to create ${templateCategories.length} categories, but only created ${createdCategories.count}`,
      );
    }
    // Generate JWT token for the newly registered user
    const token = jwt.sign(
      {
        userId: newUser.id,
        username: newUser.username,
      },
      env.JWT_SECRET as string,
      {
        expiresIn: '48h',
      },
    );
    res.cookie('token', token, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: process.env.CLIENT_HOST === 'ALLOW_ALL' ? 'none' : 'strict',
      maxAge: 48 * 60 * 60 * 1000,
    });

    console.log('Sending success response...');
    res.status(201).json({
      message: 'User registration successful!',
      token,
      data: newUser,
    });
    console.log('Response sent successfully');
  } catch (err) {
    console.error('Error in registerUser:', err);
    console.error('Error type:', typeof err);
    console.error('Error constructor:', err?.constructor?.name);

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      console.error('Prisma error details:', {
        code: err.code,
        message: err.message,
        meta: err.meta,
      });

      if (err.code === 'P2002') {
        console.log('Sending 409 response for duplicate user');
        res.status(409).json({
          message: 'Username already taken',
          error: 'Unique constraint violation',
        });
        return;
      }
    }

    console.error('Unexpected error occurred:', err);
    console.log('Calling next(err) to pass to error handler');
    next(err);
  }
};

export const logInUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  console.log('logInUser function called');
  console.log('Request body:', JSON.stringify(req.body, null, 2));

  try {
    const { username, password } = req.body;
    console.log('Login attempt for username:', username);

    if (!username || !password) {
      console.log('Missing username or password');
      res.status(400).json({ message: 'Username and password are required.' });
      return;
    }

    console.log('Looking up user by username...');
    const user = await prisma.users.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        password_hash: true,
        default_currency_id: true,
      },
    });

    if (!user) {
      console.log('User not found:', username);
      res.status(401).json({ message: 'Invalid username or password.' });
      return;
    }

    console.log('User found, verifying password...');
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      console.log('Invalid password for user:', username);
      res.status(401).json({ message: 'Invalid username or password.' });
      return;
    }

    console.log('Password valid, generating token...');
    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
      },
      env.JWT_SECRET as string,
      {
        expiresIn: '48h',
      },
    );

    console.log('Setting cookie and sending response...');
    res.cookie('token', token, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: process.env.CLIENT_HOST === 'ALLOW_ALL' ? 'none' : 'strict',
      maxAge: 48 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: 'Login successful!',
      user: {
        id: user.id,
        username: user.username,
        defaultCurrencyId: user.default_currency_id,
      },
    });
    console.log('Login response sent successfully');
  } catch (err) {
    console.error('Error in logInUser:', err);
    next(err);
  }
};

export const logOutUser = (_: Request, res: Response): void => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'strict',
    secure: env.NODE_ENV === 'production',
  });

  console.log('Cookie cleared, redirecting...');
  res.status(302).redirect('/api/v1/auth/login');
};
