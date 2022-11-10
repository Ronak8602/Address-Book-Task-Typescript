let selectedIndex: string;
let nameInput: HTMLInputElement = document.querySelector("#nameInput")!;
let emailInput: HTMLInputElement = document.querySelector("#emailInput")!;
let mobileInput: HTMLInputElement = document.querySelector("#mobileInput")!;
let landlineInput: HTMLInputElement = document.querySelector("#landlineInput")!;
let websiteInput: HTMLInputElement = document.querySelector("#websiteInput")!;
let addressInput: HTMLInputElement = document.querySelector("#addressInput")!;

interface Contact {
    key: string,
    name: string,
    email: string,
    mobile: string,
    landline: string,
    website: string,
    address: string
}

function validate(name: string, email: string, mobile: string, landline: string, website: string) {

    let nameFilter: RegExp = /^[A-Za-z ]+$/;
    let emailFilter: RegExp =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let mobileFilter: RegExp = /^\d{10}$/;
    var websiteFilter: RegExp =
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;;

    let count: number = 0;

    if (name == "") {
        document.querySelector("#nameWarning")!.textContent = "Name can't be empty";
        count++;
    } else {
        if (!nameFilter.test(name)) {
            document.querySelector("#nameWarning")!.textContent = "Enter valid name";
            count++;
        } else {
            document.querySelector("#nameWarning")!.textContent = "*";
        }
    }

    if (email != "") {
        if (!emailFilter.test(email)) {
            document.querySelector("#emailWarning")!.textContent = "Enter valid email";
            count++;
        } else {
            document.querySelector("#emailWarning")!.textContent = "";
        }
    }

    if (mobile == "") {
        document.querySelector("#mobileWarning")!.textContent = "Mobile can't be empty";
        count++;
    } else {
        if (!mobileFilter.test(mobile)) {
            document.querySelector("#mobileWarning")!.textContent = "Enter valid mobile number";
            count++;
        } else {
            document.querySelector("#mobileWarning")!.textContent = "*";
        }
    }

    if (landline != "") {
        if (!mobileFilter.test(landline)) {
            document.querySelector("#landlineWarning")!.textContent = "Enter valid landline";
            count++;
        } else {
            document.querySelector("#landlineWarning")!.textContent = "";
        }
    }

    if (website != "") {
        if (!websiteFilter.test(website)) {
            document.querySelector("#websiteWarning")!.textContent = "Enter valid website";
            count++;
        } else {
            document.querySelector("#websiteWarning")!.textContent = "";
        }
    }


    return count > 0 ? false : true;
}

function setValidators() {
    document.querySelector("#nameWarning")!.textContent = "*";
    document.querySelector("#emailWarning")!.textContent = "";
    document.querySelector("#mobileWarning")!.textContent = "*";
    document.querySelector("#landlineWarning")!.textContent = "";
    document.querySelector("#websiteWarning")!.textContent = "";
}

//* TOGGLES ADD CONTACT DIALOGUE
function toggleAddDialogue() {
    if (document.querySelector("#addContactDialog")!.classList.contains("show2")) {
        document.querySelector("#addContactDialog")!.classList.toggle("show2");
        document.querySelector("#updateContactButton")!.classList.toggle("showButton");
    }

    setValidators();

    nameInput.value = "";
    emailInput.value = "";
    mobileInput.value = "";
    landlineInput.value = "";
    websiteInput.value = "";
    addressInput.value = "";
    document.querySelector("#addContactDialog")!.classList.toggle("show");
    document.querySelector("#addContactButton")!.classList.toggle("showButton");

}

//* TOGGLES UPDATE CONTACT DIALOGUE
function toggleUpdateDialogue() {
    document.querySelector("#addContactDialog")!.classList.toggle("show2");
    document.querySelector("#updateContactButton")!.classList.toggle("showButton");
    setValidators();
}

//* ADD CONTACT TO LOCAL STORAGE

function addContact() {

    let isCorrect: boolean = validate(nameInput.value, emailInput.value, mobileInput.value, landlineInput.value, addressInput.value);

    if (isCorrect) {
        let key: string = Date.now().toString();
        let contactDataObject: Contact = createContactDataObject(key);
        createNewContactDiv(key, contactDataObject);
        let dataArray: Array<Contact> = getFromLocalStorage("users")!;
        dataArray.push(contactDataObject);
        setLocalStorage("users", JSON.stringify(dataArray));
        addEventListenerOnContactCards();
        toggleAddDialogue();
    }
    if (getFromLocalStorage("users").length == 1) {
        document.getElementById("emptyMessage")!.remove();
    }
}

//* CREATE NEW CONTACT DIV

function createNewContactDiv(index: string, data: Contact) {
    let contactCardNode = createContactNode(index, data.name, data.email, data.mobile);
    document.querySelector("#contactList")!.appendChild(contactCardNode);
}

//* SHOW CONTACT DETAILS

function showContactDetails(id: string) {

    if (document.querySelector("#addContactDialog")!.classList.contains("show2")) {
        document.querySelector("#addContactDialog")!.classList.toggle("show2");
        document.querySelector("#updateContactButton")!.classList.toggle("showButton");
    }

    if (document.querySelector("#addContactDialog")!.classList.contains("show")) {
        document.querySelector("#addContactDialog")!.classList.toggle("show");
        document.querySelector("#addContactButton")!.classList.toggle("showButton");
    }

    let userList: Array<Contact> = getFromLocalStorage("users");

    function getData(x: Contact) {
        if (x.key == id) {
            return 1;
        }
    }

    let filterList: Array<Contact> = userList.filter(getData);
    let data: Contact = filterList[0];

    console.log(data);

    document.querySelector(".editDiv")!.setAttribute("id", `edit${id}`);
    document.querySelector(".deleteDiv")!.setAttribute("id", `delete${id}`);

    document.querySelector("#nameDetail")!.textContent = data.name;
    document.querySelector("#emailDetail")!.textContent = data.email;
    document.querySelector("#mobileDetail")!.textContent = data.mobile;
    document.querySelector("#landlineDetail")!.textContent = data.landline;
    document.querySelector("#websiteDetail")!.textContent = data.website;
    document.querySelector("#addressDetail1")!.textContent = data.address;

    document.querySelector("#contactDetailCard")!.classList.remove("invisible");

}

//* UPDATE CONTACT

function openUpdateContactDialog(id: string) {
    selectedIndex = id;
    let userList: Array<Contact> = getFromLocalStorage("users");

    function getData(x: Contact) {
        if (x.key == id) {
            return 1;
        }
    }

    let filterList: Array<Contact> = userList.filter(getData);
    let data: Contact = filterList[0];

    nameInput.value = data.name;
    emailInput.value = data.email;
    mobileInput.value = data.mobile;
    landlineInput.value = data.landline;
    websiteInput.value = data.website;
    addressInput.value = data.address;


    toggleUpdateDialogue();
}

function updateContact() {

    let contactDataObject: Contact = createContactDataObject(selectedIndex);

    let isCorrect: boolean = validate(contactDataObject.name, contactDataObject.email, contactDataObject.mobile, contactDataObject.landline, contactDataObject.website);


    if (isCorrect) {
        let userList: Array<Contact> = getFromLocalStorage("users");

        let obj = userList.find((x, i) => {
            if (x.key === selectedIndex) {
                userList[i] = contactDataObject;
                return true;  // stop searching
            }
        });
        setLocalStorage("users", JSON.stringify(userList));


        document.querySelector("#nameDetail")!.textContent = contactDataObject.name;
        document.querySelector("#emailDetail")!.textContent = contactDataObject.email;
        document.querySelector("#mobileDetail")!.textContent = contactDataObject.mobile;
        document.querySelector("#landlineDetail")!.textContent = contactDataObject.landline;
        document.querySelector("#websiteDetail")!.textContent = contactDataObject.website;
        document.querySelector("#addressDetail1")!.textContent = contactDataObject.address;

        document.getElementById(selectedIndex)!.innerHTML = `
    <p class="contactName">${contactDataObject.name}</p>
        <p class="contactDetails">${contactDataObject.email}</p>
        <p class="contactDetails">${contactDataObject.mobile}</p>`;
        toggleUpdateDialogue();
    }
}

//* DELETE CONTACT

function deleteContact(id: string) {
    document.getElementById(id)!.remove();
    let userList: Array<Contact> = getFromLocalStorage("users");
    function getData(x: Contact) {
        if (x.key == id) {
            return 0;
        }
        return 1;
    }

    let updatedUserList = userList.filter(getData);
    setLocalStorage("users", JSON.stringify(updatedUserList));

    document.querySelector("#contactDetailCard")!.classList.add("invisible");
    checkEmptyMessage();
}

//* LOAD CONTACTS ON STARTUP

function loadContacts() {
    let contactData: Array<Contact> = getFromLocalStorage("users");
    for (let i = 0; i < contactData.length; i++) {
        let data = contactData[i];
        let newContactNode = createContactNode(data.key, data.name, data.email, data.mobile);
        document.querySelector("#contactList")!.appendChild(newContactNode);
    }
}

//* CREATE CONTACT NODE

function createContactNode(id: string, name: string, email: string, mobile: string) {
    const contactNode = document.createElement("div");
    contactNode.setAttribute("class", "contactCard");
    contactNode.setAttribute("id", id);


    const namePara = document.createElement("p");
    const emailPara = document.createElement("p");
    const mobilePara = document.createElement("p");
    const nameTextNode = document.createTextNode(name);
    const emailTextNode = document.createTextNode(email);
    const mobileTextNode = document.createTextNode(mobile);

    namePara.appendChild(nameTextNode);
    namePara.setAttribute("class", "contactName");
    emailPara.appendChild(emailTextNode);
    emailPara.setAttribute("class", "contactDetails");
    mobilePara.appendChild(mobileTextNode);
    mobilePara.setAttribute("class", "contactDetails");

    contactNode.appendChild(namePara);
    contactNode.appendChild(emailPara);
    contactNode.appendChild(mobilePara);

    return contactNode;
}

//* CLOSE DIALOG BOX

function closeDialog() {
    if (document.querySelector("#addContactDialog")!.classList.contains("show")) {
        toggleAddDialogue();
        return;
    }
    if (document.querySelector("#addContactDialog")!.classList.contains("show2")) {
        toggleUpdateDialogue();
        return;
    }
}

//* ADD EVENT LISTENERS ON CONTACT CARDS

function addEventListenerOnContactCards() {
    let userList: Array<Contact> = getFromLocalStorage("users")!;
    for (let i: number = 0; i < userList.length; i++) {
        document.querySelectorAll(".contactCard")[i].addEventListener("click", function (this: HTMLDivElement) {
            showContactDetails(this.id);
        });
    }
}

//* CHECK LOCAL STORAGE

function checkLocalStorage() {
    if (getFromLocalStorage("users") === null) {
        setLocalStorage("users", JSON.stringify([]));
    }
}

//* LOCAL STORAGE CRUD OPERATIONS

function getFromLocalStorage(key: string): Array<Contact> {
    try {
        let data: string = localStorage.getItem(key)!;
        let obj: Array<Contact> = JSON.parse(data);
        return obj;
    } catch (error) {
        console.log(error);
        return [];
    }
}

function setLocalStorage(key: string, value: string) {
    try {
        localStorage.setItem(key, value);
    } catch (error) {
        console.log(error);
    }
}

//* MANAGE EMPTY MESSAGE

function checkEmptyMessage() {
    let emptyNode = document.createElement("p");
    let emptyTextNode = document.createTextNode("Empty Contact List");
    emptyNode.appendChild(emptyTextNode);
    emptyNode.setAttribute("class", "emptyMessage");
    emptyNode.setAttribute("id", "emptyMessage");


    if (getFromLocalStorage("users")!.length === 0) {
        document.getElementById("contactList")!.prepend(emptyNode);
    } else {
        document.getElementById("emptyMessage")!.remove();
    }
}

//* CREATE CONTACT DATA OBJECT

function createContactDataObject(key: string): Contact {
    let contactDataObject: Contact = {
        key: key,
        name: nameInput.value,
        email: emailInput.value,
        mobile: mobileInput.value,
        landline: landlineInput.value,
        website: websiteInput.value,
        address: addressInput.value
    };

    return contactDataObject;
}

//* MAIN CODE

document.addEventListener("DOMContentLoaded", () => {
    checkLocalStorage();
    loadContacts();
    document.querySelector("#addContact")!.addEventListener("click", toggleAddDialogue);
    document.querySelector("#addContactButton")!.addEventListener("click", addContact);
    document.querySelector("#updateContactButton")!.addEventListener("click", updateContact);
    document.querySelector("#cancelButton")!.addEventListener("click", closeDialog);
    addEventListenerOnContactCards();
    document.querySelector(".editDiv")!.addEventListener("click", function (this: HTMLDivElement) {
        openUpdateContactDialog(this.id.substring(4));
    });
    document.querySelector(".deleteDiv")!.addEventListener("click", function (this: HTMLDivElement) {
        deleteContact(this.id.substring(6));
    });
    checkEmptyMessage();
});