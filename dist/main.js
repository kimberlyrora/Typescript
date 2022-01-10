var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
//INSTALL TS
//#region
/* 1. npm install -g typescript
   2. tsc -v
   3. tsc main.ts to transpile main.ts
   4. tsc main.ts -w to watch mode and transpile from TS to JS
   // tsconfig.json
   1. to transpile from TS to JS(from src to dist)
*/
//#endregion
// TYPE DEFINITIONS intro
//#region 
// VARIABLES
var a = "1";
var hello = "hello";
// In ts, const are always constants(add pic)
// Use let to reassign
var hello2 = "hello";
// In ts, variables can't change value data type, you can change value only to the same type
// hello2 = true;
// syntax
var hello3 = "hello";
// error
// hello3 = {};
// FUNCTIONS
// syntax
var getFullName = function (name, surname) {
    // error return 3 + 9			
    return name + " " + surname;
};
console.log(getFullName("Moster", "Rojas"));
var user = {
    name: "Monster",
    age: 30,
    getMessage: function () {
        return "Hello" + name;
    }
};
//ERROR without ?
var I2 = {
    name: "Jack",
    getMessage: function () {
        return "Hello" + name;
    }
};
//syntax for aliases
var popularTags = ['dragon', 'coffee'];
var dragonsTag = "dragon";
var username = "alex";
//syntax
var pageNumber = 1;
//if we don't define default value, it would be undefined
var errorMessage = null;
var userOnBlock3 = null;
//#endregion	
// ANY/VOID/NEVER/UNKNOWN: 
//#region
// VOID: syntax - don't return anything // undefined || void
var doSomething = function () {
    console.log("doSomething");
    //  ERROR: return 4
};
// ANY: turns off TS checks
var foo = "foo";
//ERROR
console.log(foo.bar());
//NEVER: can't be executed to the end // will never happen, never end ?????
var doSomething2 = function () {
    throw "never";
};
//UNKNOWN: introduced in TS 3
var vAny = 10;
var vUnknown = 10;
var s1 = vAny;
//error
//let s2: string = vUnknown;
console.log(vAny.foo());
//error
//console.log(vUnknown.foo());
//TIP
// Type assertion: convert one type to another || as data type
var s3 = vUnknown;
var pageNumber2 = '1';
var numericPageNumber = pageNumber2;
//#endregion	
// WORKING WITH DOM: 
//#region
//TS has lots of types for DOM out of the box
//Element, Event are the highest class in hierarchy for DOM elements
//Pass from general to specific, type assertion
var someElement = document.querySelector('.foo');
console.log("someElement", someElement.value);
someElement.addEventListener("blur", function (event) {
    var target = event.target;
    console.log("event", target.value);
    // ERROR
    //console.log("event", event.target.value);
});
//Implementing interface in classes
var UserClassExample = /** @class */ (function () {
    function UserClassExample(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.unchangeableName = firstName;
    }
    // ERROR
    //changeUnchangeableName(): void {
    //	this.unchangeableName = "foo";	
    //}
    //Gets error when commented this fn because is required on UserClassInterface
    UserClassExample.prototype.getFullName = function () {
        return this.firstName + ' ' + this.lastName;
    };
    //When using static, examples o  line 
    UserClassExample.maxAge = 50; // Property just accessible on the class itself not instances
    return UserClassExample;
}());
var userClass = new UserClassExample("Monster", "lessons");
//ERROR
//const userClass2 = new User(true, "lessons");
//console.log("private property", userClass.firstName);
// Static examples
// 1. ERROR
//console.log("on instances", userClass.maxAge);
// 2. On class itself, good
console.log("on instances", UserClassExample.maxAge);
//IMPORTANT NOTE: We can just check types on TS.
// INHERITANCE
var Admin = /** @class */ (function (_super) {
    __extends(Admin, _super);
    function Admin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Admin.prototype.setEditor = function (editor) {
        this.editor = editor;
    };
    Admin.prototype.getEditor = function () {
        return this.editor;
    };
    return Admin;
}(UserClassExample));
var admin = new Admin('Foo', 'Bar');
//accessing all properties from UserClassExample
console.log(admin.getFullName);
// accessing new methods added on class Admin
console.log(admin.getEditor);
// extends to ensure that we are passing the correct type are being more strict
var addId = function (obj) {
    var id = Math.random().toString(16);
    return __assign(__assign({}, obj), { id: id });
};
// when using generics on interfaces, is going to be necessary to set a default value like meta
// we must provide a generic type if there is not default
var userGenerics = {
    name: "Jack",
    data: {
        meta: "foo"
    },
    meta: "bar"
};
//ERROR (?)
var result = addId(userGenerics);
console.log("result", result);
//#endregion
// ENUMS: 
//#region
var statuses = {
    notStarted: 0,
    inProgress: 1,
    done: 2
};
console.log(statuses.inProgress);
// Reserved word to create an enum 
// syntax
//Good Practice:  Prefix or Sufix
var StatusEnum;
(function (StatusEnum) {
    StatusEnum["NotStarted"] = "notStarted";
    StatusEnum["InProgress"] = "inProgress";
    StatusEnum["Done"] = "done";
})(StatusEnum || (StatusEnum = {}));
//benefits with enums: enum can be used as value and data type
console.log(StatusEnum.InProgress);
var notStartedStatus = StatusEnum.NotStarted;
//ERROR
//notStartedStatus = "foo";
//GOOD
notStartedStatus = StatusEnum.Done;
//#endregion
