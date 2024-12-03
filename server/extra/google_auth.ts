import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { appClient } from "./firebase";
import getSequelizeInstance from "@/database/db";
import { Users } from "@/database/models/users";

