
//assigning form elements and input fields to variables
const form = document.querySelector("form[name='contactForm']");
const nameInput = document.querySelector("input[name='name']");
const emailInput = document.querySelector("input[name='email']");
const phoneInput = document.querySelector("input[name='phone']");
const messageInput = document.querySelector("textarea[name='message']");


//regex(s) from stackoverflow lol (to validate phone and email)
const isValidEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const isValidPhone = (phone) => {
  const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im; //TODO: correct this regex -> accepts invalid kenyan numbers
  return re.test(String(phone).toLowerCase());
};

//function to check name is atleast 3 characters
const isValidName = (name) => {
	const letters = /^[a-zA-Z-'. ]+$/;
	let na = "";
    if (name.length >= 3) {
    	na = name.match(letters);
    }
	return na;
};

//function to check message is atleast 30 characters
const isValidMessage = (message) => {
	let mes = "";
    if (message.length >= 30) {
    	mes = message;
    }
	return mes;
};

//methods to check if input values meet our criteria (returns a boolean)
 nameInput.isValid = () => isValidName(nameInput.value);
 emailInput.isValid = () => isValidEmail(emailInput.value);
 phoneInput.isValid = () => isValidPhone(phoneInput.value);
 messageInput.isValid = () => isValidMessage(messageInput.value);

//an array of input values to avoid redudancy
const inputFields = [nameInput, emailInput, phoneInput, messageInput];

//when the form is rendered it should not be validated
let Validate = false;
//when the form is rendered its valid status is negative
let valid = false;

//function to check the array of inputFields for validity and returns an error message (unhides <p> element)
const validate = () => {
	let valid = true; //resets status of form
	if (!Validate) return; //stops validation from taking place before first submission 

	const test = (input) => {
		if(!input.isValid()) {
			input.nextElementSibling.classList.remove("hidden");
			valid = false;
		}else {
			input.nextElementSibling.classList.add("hidden");
			valid = true;
		}
	}

	//call test function on the input fields
	inputFields.forEach(test);
}

form.addEventListener('submit', e => {
	e.preventDefault(); //prevents default submit form action action
	Validate = true; //allows validation to be done
	
	//call to the validate function
	validate();
	
	if(valid) {
		// TODO: an ajax request to submit the form
	}
});

//array method to check validity of inputs as they are being typed to clear errors from the first submit action
inputFields.forEach((input) => input.addEventListener("input", validate));