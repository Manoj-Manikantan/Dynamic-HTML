"use strict";

/* Form 1 */
const FirstName = document.getElementById("firstName");
const LastName = document.getElementById("lastName");
const LockerNumber = document.getElementById("lockerNumber");
const Combination = document.getElementById("combination");

/* Form 2 */
const SelectStudent = document.getElementById("student");
const SelectLocker = document.getElementById("selectedLocker");
const SelectCombination = document.getElementById("selectedCombination");

/* Un ordered list creation */
const lastPara = $("body > p:last");
const unorderedList = document.createElement("ul");

/* On selecting the drop down, respective fields get updated */
SelectStudent.onselect = DisplayFields;
SelectStudent.onclick = DisplayFields;

/* Four arrays
* ArrayName for storing Last Name, First Name
* ArrayLockerNumber for storing locker number
* ArrayCombination for storing combination of the array
* ArrayForm is the concatenation of the above three arrays */
const ArrayName = [];
const ArrayLockerNumber = [];
const ArrayCombination = [];
const ArrayForm = [];
let arrayCount = 0;

/*
* AddEvent - The backbone function for this JavaScript file
* Checks if locker number exists or not
* Displays user inputted information in the "requestForm" - second form
* Displays the locker information at the left bottom of the second form */
function AddEvent()
{
    /* check if locker number exists */
    if(ArrayLockerNumber.length > 0)
    {
        for(let i = 0; i <= ArrayLockerNumber.length; i++)
        {
            if (ArrayLockerNumber[i] === LockerNumber.value)
            {
                window.alert("Locker number already exists!");
                return;
            }
        }
    }
    /* Pushing all the user inputted data into respective arrays */
    ArrayName.push(LastName.value + ", " + FirstName.value);
    ArrayLockerNumber.push(LockerNumber.value);
    ArrayCombination.push(Combination.value);
    ArrayForm.push(ArrayName[arrayCount] + "!" + ArrayLockerNumber[arrayCount] + "!" + ArrayCombination[arrayCount]);
    SelectStudent.textContent = "";
    SelectLocker.value = "";
    SelectCombination.value = "";
    displayForm();
    arrayCount++;
    FirstName.value = "";
    LastName.value = "";
    LockerNumber.value = "";
    Combination.value = "";
}

/* Display information in the second form
* Includes appending options to the drop down list
* Sort the drop down list in lexicographical order
* Displaying relevant locker number and combination upon adding */
function displayForm()
{
    for(let i = 0; i <= arrayCount; i++)
    {
        let dropDown = document.createElement("option");
        dropDown.textContent = ArrayName[i];
        SelectStudent.appendChild(dropDown);
    }
    SelectLocker.value = ArrayLockerNumber[arrayCount];
    SelectCombination.value = ArrayCombination[arrayCount];

   if(SelectStudent.options.length > 0)
    {
        for(let i = 1; i < SelectStudent.options.length; i++)
        {
            for(let j = 0; j < SelectStudent.options.length; j++)
            {
                if((SelectStudent.options[i].textContent).toLowerCase() < (SelectStudent.options[j].textContent).toLowerCase())
                {
                    const storeContent = SelectStudent.options[i].textContent;
                    SelectStudent.options[i].textContent = SelectStudent.options[j].textContent;
                    SelectStudent.options[j].textContent = storeContent;
                }
            }
            for(let k = 0; k <=1; k++)
            {
                if (SelectStudent.options[k].textContent === ArrayName[arrayCount])
                {
                    SelectStudent.options[k].setAttribute("selected","true");
                }
            }
        }
    }
    DisplayList();
}

/* Display the locker information at the left bottom in descending order
* A for loop from the recent data until the initial data
* Appending with li element and displayed in the end */
function DisplayList()
{
    unorderedList.textContent = "";
    for(let i = arrayCount; i >= 0; i--)
    {
        let liTag = document.createElement("li");
        liTag.textContent = ArrayLockerNumber[i] + ": " + ArrayName[i];
        unorderedList.appendChild(liTag);
    }
    lastPara.append(unorderedList);
}

/* Displays locker number and combination upon drop down selection
* Fetching the selection from the user and running it through ArrayForm until i get the match
* Once matched, use the index to display the information accordingly */
function DisplayFields()
{
    let SelectedOption = SelectStudent.selectedIndex;
    let SelectedValue = SelectStudent.options[SelectedOption].textContent;

    for(let i = 0; i <= arrayCount; i++)
    {
        let StringSplit = ArrayForm[i];
        let ArraySplit = [];
        ArraySplit = StringSplit.split("!");
        if (SelectedValue === ArraySplit[0])
        {
            SelectLocker.value = ArraySplit[1];
            SelectCombination.value = ArraySplit[2];
            break;
        }
    }
}

/* Regex code */
jQuery.validator.addMethod("rfirstName",function (value, elem)
{
    return this.optional(elem) || /^[a-z]+(?:['\s-]*[a-z]+)*$/i.test(value);
},"First name must have at least two letters and can only contain spaces, apostrophes and dashes!");

jQuery.validator.addMethod("rlastName",function (value, elem)
{
    return this.optional(elem) || /^[a-z]+(?:['\s-]*[a-z]+)*$/i.test(value);
},"Last name must have at least two letters and can contain spaces, apostrophes and dashes!");

jQuery.validator.addMethod("rcombination",function (value, elem)
{
    return this.optional(elem) || /^[0-5]*[0-9][-][0-5]?[0-9][-][0-5]?[0-9]$/.test(value);
},"The combination can only be entered in 'nn-nn-nn' format.");

/* Form validation */
$(document).ready(function ()
{
    $("#lockerForm").validate(
    {
        rules: {
            firstName: {
                required: true,
                minlength: 2,
                rfirstName: true
            },
            lastName: {
                required: true,
                minlength: 2,
                rlastName: true
            },
            lockerNumber: {
                required: true,
                range: [1,1999],
                digits: true,
            },
            combination: {
                required: true,
                rcombination: true
            }
        },
        messages:
        {
            firstName: {
                required: "First name is a mandatory field"
            },
            lastName: {
                required: "Last name is a mandatory field"
            },
            lockerNumber: {
                range: "The numbers can be only between 1 - 1999",
                digits: "The input should only be a number"
            },
            combination: {
                maxLength: "Max length cannot be more than 8 characters",
            },
        },
        submitHandler: function(){
            AddEvent();
        }
    });
});