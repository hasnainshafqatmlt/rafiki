# INSEADER React App

This is a React App created using Webpack 3 and ExpressJs!

## Starting the dev server

Make sure you have Node.js installed.

1. Clone the repo: `git clone git clone git@bitbucket.org:kogno/rafiki-app.git`
2. Run `npm install`
3. Start the dev server using `npm start`
3. Open [http://localhost:8080](http://localhost:8080)

## Available Commands

- `npm run local` - start the Local server
- `npm run dev` - start the Dev server
- `npm run build` - create a production ready build in `dist` folder
- `npm run prod` - start the Produciton ready serve from `dist`
- `npm clean` - delete the dist folder
- `npm run lint` - execute an eslint check
- `npm test` - run all tests

## Vendor Exporting

You can export specific vendors in separate files and load them. All vendors should be included in `app/vendors` and will be exported in a `vendors` folder under `dist`. The main idea is to serve independent JavaScript and CSS libraries, though currently all file formats are supported.

! Don't forget to add the vendors in `app/index.html`.

## Production code

Run `npm run prod`. The production-ready code will be located under `dist` folder.


## Tests

Every component can have it's corresponding unit test under `./tests/components`. We use [Chai](https://github.com/chaijs/chai) to do the unit testing. For example:

```javascript
describe('App Component', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<App />);
	});

	it('should exist', () => {
		expect(wrapper).to.exist;
	});

	it('should have one heading', () => {
		expect(wrapper.find('#heading').type()).to.equal('h2');
	});
});
```

To run the tests simply execute `npm test` on the project root.

