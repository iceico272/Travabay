// hash_generator.js
import bcrypt from 'bcryptjs';

// The password you want to use for login
const passwordToHash = 'test@123'; 

async function generateHash() {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(passwordToHash, salt);
        
        console.log('----------------------------------------------------');
        console.log(`Password: ${passwordToHash}`);
        console.log(`Your HASH: ${hash}`);
        console.log('----------------------------------------------------');
        console.log('COPY THIS HASH and paste it into your "admins" table.');
        
    } catch (error) {
        console.error('Hashing failed:', error);
    }
}

generateHash();