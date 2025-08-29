const express = require('express');
const app = express();
app.use(express.json());

const FULL_NAME = "john_doe";
const DOB = "17091999";
const EMAIL = "john@xyz.com";
const ROLL_NUMBER = "ABCD123";

function isNumber(str) {
    return /^[0-9]+$/.test(str);
}

function isAlphabet(str) {
    return /^[a-zA-Z]+$/.test(str);
}

function isSpecial(str) {
    return !isNumber(str) && !isAlphabet(str);
}

function alternatingCaps(str) {
    let result = '';
    let upper = true;
    for (let ch of str) {
        if (/[a-zA-Z]/.test(ch)) {
            result += upper ? ch.toUpperCase() : ch.toLowerCase();
            upper = !upper;
        }
    }
    return result;
}

app.post('/bfhl', (req, res) => {
    try {
        const data = req.body.data;
        if (!Array.isArray(data)) {
            return res.status(400).json({ is_success: false, message: "Invalid input" });
        }

        let even_numbers = [];
        let odd_numbers = [];
        let alphabets = [];
        let special_characters = [];
        let sum = 0;
        let alpha_concat = '';

        data.forEach(item => {
            if (isNumber(item)) {
                let num = parseInt(item, 10);
                if (num % 2 === 0) {
                    even_numbers.push(item);
                } else {
                    odd_numbers.push(item);
                }
                sum += num;
            } else if (isAlphabet(item)) {
                alphabets.push(item.toUpperCase());
                alpha_concat += item;
            } else if (isSpecial(item)) {
                special_characters.push(item);
            }
        });

        // Reverse alpha_concat and apply alternating caps
        let concat_string = alternatingCaps(alpha_concat.split('').reverse().join(''));

        res.status(200).json({
            is_success: true,
            user_id: `${FULL_NAME}_${DOB}`,
            email: EMAIL,
            roll_number: ROLL_NUMBER,
            odd_numbers,
            even_numbers,
            alphabets,
            special_characters,
            sum: sum.toString(),
            concat_string
        });
    } catch (err) {
        res.status(500).json({ is_success: false, message: "Server error" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});