import bodyParser from "body-parser"
import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import morgan from "morgan"
import helmet from "helmet"
import multer from "multer"
import path from "path"
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js"
import {register} from "./controllers/auth.js"
import {createPost} from "./controllers/posts.js"
import { verifyJWT } from "./middleware/auth.js"
import User from "./models/User.js"
import Post from "./models/Post.js"
import { posts,users } from "./data/index.js"
import CorsOptions from "./congigs/CorsOption.js"


// Configss

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"))
app.use(bodyParser.json({ limit:"30mb" , extended:true }))
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}));
app.use(cors());
app.use(cors(CorsOptions));
app.use("/assets",express.static(path.join(__dirname,'public/assets')));

// FILE STORAGE
const storage = multer.diskStorage({
    destination:function(req,files,cb){
        cb(null,"public/assets");
    },
    filename:function(req,file,cb){
        cb(null,file.originalname);
    }
});
const upload = multer({storage});

// Routes With File
app.post("/auth/register",upload.single("picture"),register);
app.post("/posts",verifyJWT, upload.single("picture"),createPost);

// ROutess
app.use("/auth",authRoutes);
app.use("/users",userRoutes);
app.use("/posts",postRoutes)


// Mongoose setup
const PORT = process.env.PORT || 3007;
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(PORT,()=> console.log(`Server Port:${PORT}`));
    // User.insertMany(users);
    // Post.insertMany(posts);
}).catch((err)=> console.log(`${err} did not connect`));



