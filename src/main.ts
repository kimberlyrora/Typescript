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
		const a = "1";
		const hello = "hello";
		// In ts, const are always constants(add pic)
		// Use let to reassign
		let hello2 = "hello";

		// In ts, variables can't change value data type, you can change value only to the same type
		// hello2 = true;

		// syntax
		let hello3:string = "hello";

		// error
		// hello3 = {};
		
	// FUNCTIONS
		// syntax
		const getFullName = (name: string, surname: string): string => {
			// error return 3 + 9			
			return name + " " + surname;	
		};
		console.log(getFullName("Moster", "Rojas"));
		// error
		// console.log(getFullName(true, ["foo"]));
	//#endregion
// INTERFACES: special entity that help us to create objects
	//#region 
		// TS understands objects by default, there is no entity def in JS
		
		//syntax
		// By default, all properties inside an interface are not mandatory
		interface IUser {
			name: string;
			age?: number;
			//FUNCTIONS IN INTERFACES
			getMessage(): string;
		}
		const user: IUser = {
			name: "Monster",
			age: 30,
			getMessage(){
				return "Hello" + name;
			}
		}
		
		//ERROR without ?
		const I2: IUser = {
			name: "Jack",
			getMessage(){
				return "Hello" + name;
			}
		}
		
		// Tip to avoid name collusion:, named as I[name interface] || [name interface]Interface 
	//#endregion
// TYPES AND UNIONS: 
	//#region 
		// TYPES AND INTERFACES ARE WRITTEN W/ CAPITAL LETTER
		// Type aliases: 
			type ID = string;
			type PopularTag = string;
			type MaybePopularTag = PopularTag | null;
			//syntax for aliases
				const popularTags: PopularTag[] = ['dragon', 'coffee'];
				const dragonsTag: MaybePopularTag = "dragon";
		// Union operator: to combine data types
			interface UserInterface {
				//syntax for aliases
				id: ID;
				name: string
				surname: string
			}
			let username: string =  "alex";
			//syntax
				let pageNumber: string | number = 1;
			
			//if we don't define default value, it would be undefined
			let errorMessage: string | null = null;
			
			let userOnBlock3: UserInterface | null = null;
	//#endregion	
// ANY/VOID/NEVER/UNKNOWN: 
	//#region
	  // VOID: syntax - don't return anything // undefined || void
		const doSomething = (): void => {
			console.log("doSomething");
			//  ERROR: return 4
		}
	  // ANY: turns off TS checks
		let foo: any = "foo"
		//ERROR
		console.log(foo.bar());
	  //NEVER: can't be executed to the end // will never happen, never end ?????
		const doSomething2 = (): never => {
			throw "never";
		}
	  //UNKNOWN: introduced in TS 3
		let vAny: any = 10
		let vUnknown: unknown = 10;
		
		let s1: string = vAny;
		//error
		//let s2: string = vUnknown;
		
		console.log(vAny.foo());
		//error
		//console.log(vUnknown.foo());
		//TIP
		// Type assertion: convert one type to another || as data type
		let s3: string = vUnknown as string;
		let pageNumber2: string = '1';
		let numericPageNumber: number = (pageNumber2 as unknown) as number;
	//#endregion	
// WORKING WITH DOM: 
	//#region
	//TS has lots of types for DOM out of the box
	//Element, Event are the highest class in hierarchy for DOM elements
	//Pass from general to specific, type assertion
	const someElement = document.querySelector('.foo') as HTMLInputElement;
	console.log("someElement", someElement.value);
	
	someElement.addEventListener("blur", (event) => {
		const target = event.target as HTMLInputElement;
		console.log("event", target.value);
		// ERROR
		//console.log("event", event.target.value);
	});
	//#endregion
// CLASSES IN TS: SUGAR AROUND PROTOTYPES
	//#region
	// Everything is public by default 
	
	interface UserClassInterface {
		getFullName(): string;	
	}
	
	//Implementing interface in classes
	class UserClassExample implements UserClassInterface {
		// making properties private to show error example
		private firstName: string;
	 	// allowed in class and it's children
		protected lastName: string;
		readonly unchangeableName: string;
		//When using static, examples o  line 
		static readonly maxAge = 50 // Property just accessible on the class itself not instances
		constructor(firstName: string, lastName: string){
			this.firstName = firstName;
			this.lastName = lastName;
			this.unchangeableName = firstName;
		}
		
		// ERROR
		//changeUnchangeableName(): void {
		//	this.unchangeableName = "foo";	
		//}
		
		//Gets error when commented this fn because is required on UserClassInterface
		getFullName(): string {
			return this.firstName + ' ' + this.lastName
		}
	}
	
	const userClass = new UserClassExample("Monster", "lessons");
	
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
	
	class Admin extends UserClassExample {	
		private editor: string;
		
		setEditor(editor: string): void {
			this.editor = editor
		}
		
		getEditor(): string {
			return this.editor
		}
	}
	
	const admin = new Admin('Foo', 'Bar');
	
	//accessing all properties from UserClassExample
	console.log(admin.getFullName);
	
	// accessing new methods added on class Admin
	console.log(admin.getEditor);
	
	//#endregion
// GENERICS: Allows provide different data types
	//#region
		// In TS if we don't provide a type, it will be implicitly any.
		// Syntax:   
		// Big T is a default name for generic, T is for a data type, this is going to define the data type to the type is being passed
		// All generics are written inside <> 
		// Passing several data types
		interface UserGenericsInterface<T, V> {
			name: string;
			//we don't know what type of data will receive but it will be considered because of generics
			data: T;
			meta: V;
		}
		
		// extends to ensure that we are passing the correct type are being more strict
		const addId =<T extends object>(obj: T) => {
			const id = Math.random().toString(16);
			return {
				...obj,
				id
			}
		}
		
		// when using generics on interfaces, is going to be necessary to set a default value like meta
		// we must provide a generic type if there is not default
		const userGenerics: UserGenericsInterface<{ meta: string }, string> = {
			name: "Jack",
			data: {
				meta: "foo"
			},
			meta: "bar",
		}
		
		//ERROR (?)
		const result = addId<UserGenericsInterface>(userGenerics);
		console.log("result", result);
		
				
	//#endregion
// ENUMS: 
	//#region
	const statuses = {
		notStarted: 0,
		inProgress: 1,
		done: 2,
	}
	
	console.log(statuses.inProgress);
	
	// Reserved word to create an enum 
	// syntax
	//Good Practice:  Prefix or Sufix
	enum StatusEnum {
		NotStarted = "notStarted",
		InProgress = "inProgress",
		Done = "done",
	}
	
	// Enums can be used inside interfaces
	interface Task {
		id: string;
		status: StatusEnum;
	}
	
	//benefits with enums: enum can be used as value and data type
	console.log(StatusEnum.InProgress);
	let notStartedStatus: StatusEnum = StatusEnum.NotStarted;
	
	//ERROR
	//notStartedStatus = "foo";
	
	//GOOD
	notStartedStatus = StatusEnum.Done;
	//#endregion
