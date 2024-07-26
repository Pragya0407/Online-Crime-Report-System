const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3001; 
const mongoURI = 'your_mongodb_atlas_uri'; 

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.json());
app.use(cors());


mongoose
  .connect(
    "mongodb+srv://ranj74384:admin2020@demo.z8hcj5m.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

  const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    phoneNumber: String,
  });
  
  const User = mongoose.model('User', userSchema);


  app.post('/signup', async (req, res) => {
    const newUser = new User(req.body);
    console.log(newUser);
  
    try {
      await newUser.save();
      res.status(201).json({ message: 'User signed up successfully' });
    } catch (error) {
      console.error('Error saving user to the database:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email, password });
  
      if (user) {
        res.status(200).json({ message: 'Login successful' });
        console.log(user);
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  const crimeReportSchema = new mongoose.Schema({
    reportId: { type: Number, unique: true },
    victim: String,
    IDproof: Buffer, 
    Address: String,
    phonenum: String,
    DescCrime: String,
    date: Date,
    Place: String,
    accepted: { type: Boolean, default: false }, 
    completed: { type: Boolean, default: false },
  });
  
  const CrimeReport = mongoose.model('CrimeReport', crimeReportSchema);
  
  const storage = multer.memoryStorage(); 
  const upload = multer({ storage });
  
  app.post('/crime', upload.single('IDproof'), async (req, res) => {
    try {
      const { victim, Address, phonenum, DescCrime, date, Place } = req.body;
      const IDproofBuffer = req.file.buffer; 
  
      // Find the latest reportId
      const latestReport = await CrimeReport.findOne().sort({ reportId: -1 });
      let reportId = 20000; 
  
      if (latestReport && !isNaN(latestReport.reportId)) {
        reportId = latestReport.reportId + 1;
      }
  
      const crimeReport = new CrimeReport({
        reportId,
        victim,
        IDproof: IDproofBuffer,
        Address,
        phonenum,
        DescCrime,
        date,
        Place,
        accepted: false, 
        completed: false, 
      });
      console.log(crimeReport);
  
      await crimeReport.save();
  
      res.status(201).json({ message: 'Crime report saved successfully' });
    } catch (error) {
      console.error('Error saving crime report:', error);
      res
        .status(500)
        .json({ error: 'An error occurred while saving the crime report' });
    }
  });
  
app.get('/crimereports', async (req, res) => {
  try {
    const crimeReports = await CrimeReport.find().sort({ reportId: 1 });
    res.status(200).json(crimeReports);
  } catch (error) {
    console.error('Error fetching crime reports:', error);
    res.status(500).json({ error: 'An error occurred while fetching crime reports' });
  }
});

app.get('/accept', async (req, res) => {
  try {
    const pendingReports = await CrimeReport.find({ accepted: false, completed: false });
    res.status(200).json(pendingReports);
  } catch (error) {
    console.error('Error fetching pending crime reports:', error);
    res.status(500).json({ error: 'An error occurred while fetching pending reports' });
  }
});

app.patch('/crimereports/:reportId', async (req, res) => {
  try {
    const reportId = req.params.reportId;

    await CrimeReport.findByIdAndUpdate(reportId, { accepted: true });

    res.status(200).json({ message: 'Crime report accepted successfully' });
  } catch (error) {
    console.error('Error accepting crime report:', error);
    res.status(500).json({ error: 'An error occurred while accepting the crime report' });
  }
});

// Route to fetch pending cases
app.get('/pending', async (req, res) => {
  try {
    const pendingReports = await CrimeReport.find({ accepted: true, completed: false });
    res.status(200).json(pendingReports);
  } catch (error) {
    console.error('Error fetching pending crime reports:', error);
    res.status(500).json({ error: 'An error occurred while fetching pending reports' });
  }
});

// Route to mark a case as completed
app.patch('/crimereports/:reportId/complete', async (req, res) => {
  try {
    const reportId = req.params.reportId;

    await CrimeReport.findByIdAndUpdate(reportId, { completed: true });

    res.status(200).json({ message: 'Crime report marked as completed successfully' });
  } catch (error) {
    console.error('Error marking report as completed:', error);
    res.status(500).json({ error: 'An error occurred while marking the report as completed' });
  }
});

app.get('/crime/:reportId/idproof', async (req, res) => {
  try {
    const reportId = req.params.reportId;

    // Find the crime report by reportId
    const crimeReport = await CrimeReport.findOne({ reportId });

    if (!crimeReport) {
      return res.status(404).json({ error: 'Crime report not found' });
    }

    // Set the response header to specify the file type and attachment
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Disposition', `attachment; filename="${reportId}_idproof.txt"`);

    // Send the ID proof buffer as the response
    res.send(crimeReport.IDproof);
  } catch (error) {
    console.error('Error serving ID proof:', error);
    res.status(500).json({ error: 'An error occurred while serving the ID proof' });
  }
});


const adminUserSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const AdminUser = mongoose.model('AdminUser', adminUserSchema);

// Admin sign-up route
app.post('/admin/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingAdmin = await AdminUser.findOne({ email });

    if (existingAdmin) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    // Create a new admin user
    const newAdminUser = new AdminUser({ email, password });

    await newAdminUser.save();

    res.status(201).json({ message: 'Admin signed up successfully' });
  } catch (error) {
    console.error('Error during admin sign-up:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/admin/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const adminUser = await AdminUser.findOne({ email, password });

    if (adminUser) {
      res.status(200).json({ message: 'Admin login successful' });
    } else {
      res.status(401).json({ error: 'Admin credentials not valid' });
    }
  } catch (error) {
    console.error('Error during admin login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
