# Application Setup

## Configure YouTrack

- Create a default assignee group in YouTrack. Get the GUID from URL. Configure it in youtrack.properties (default.issue.assignee.group.id)

* Setup the following for demo purpose (this will be created through IndustryApps platform in production)
  - Create Projects
  - Create users in YouTrack (for deme purpose) and extract user token
    - Customer token (slowimo) perm:dXNlcl9zbG93aW1vX2N1c3RvbWVy.NDgtMTY=.W0zYJIkqyAjrYsXJTHEkwKHpBzeew6
    - Customer token (tesla) perm:dXNlcl90ZXNsYV9jdXN0b21lcg==.NDgtMTg=.ELgnRXB2409bO04kzMNrdua48KGPQY
    - Vendor token (bytestrone) - perm:dXNlcl9ieXRlc3Ryb25lX3ZlbmRvcg==.NDgtMTc=.zuHOrJlyv17TDpqTkTaaTWEn0H1UXz
    - Root token (janson) - perm:amFuc29u.NDgtMTk=.UD3daw9VeXqQfNVzZaEkWXmWd1ss1x
  - Create vendor group

# Intro

This is the git repo for the CSA (Customer Service App) UI for IndustryApps platform. The UI is built on React & Next.js.

## Quick setup guide

<!-- [x] - author basic setup guide -->

Clone the repo

```
git clone https://bytestrone@dev.azure.com/bytestrone/industry-apps/_git/customer-support-ui
```

Checkout develop branch

```
cd customer-support-ui
git checkout develop
```

Install node modules

```
npm install
```

Fire-up json-server for mocked IndustryApps services (install json-server if not already done "`npm install -g json-server`")

```
json-server --watch --port 3004 fakeJsonApi/db.json --middlewares fakeJsonApi/singular.js
```

Run the app in dev mode

```
npm run dev
```

The application should now be up an running in http://localhost:3000/

## Components Used

### CKEditor

[CKEditor 5](https://ckeditor.com/ckeditor-5/) is used as the rich text editor. It uses the [classic build](https://www.npmjs.com/package/@ckeditor/ckeditor5-build-classic) along with [CKEditor 5 rich text editor component for React](https://www.npmjs.com/package/@ckeditor/ckeditor5-react)

There were a number of issues in integrating CKEditor5 with NextJS & Typescript. It also required a custom build to enable GFM (Markdown). Details of the issues and references are provided below.

- CKEditor is not a Typescript library and hence types are not available as part of the package [CKEditor Typings for TypeScript](https://github.com/ckeditor/ckeditor5/issues/504). This is not expected to be implemented anytime soon but good news is that there are [plans for that](https://github.com/ckeditor/ckeditor5/issues/1415). For the time being, the workaround is to include the type locally (see below). See this thread on how to do that

  ```javascript
  //typings.d.ts in root folder
  declare module '@ckeditor/ckeditor5-build-classic' {
    const ClassicEditorBuild: any;

    export = ClassicEditorBuild;
  }

  declare module '@ckeditor/ckeditor5-react' {
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
    import Event from '@ckeditor/ckeditor5-utils/src/eventinfo';
    import { EditorConfig } from '@ckeditor/ckeditor5-core/src/editor/editorconfig';
    import * as React from 'react';
    const CKEditor: React.FunctionComponent<{
      name?: string;
      disabled?: boolean;
      editor: typeof ClassicEditor;
      data?: string;
      id?: string;
      config?: EditorConfig;
      onReady?: (editor: ClassicEditor) => void;
      onChange?: (event: Event, editor: ClassicEditor) => void;
      onBlur?: (event: Event, editor: ClassicEditor) => void;
      onFocus?: (event: Event, editor: ClassicEditor) => void;
      onError?: (event: Event, editor: ClassicEditor) => void;
    }>;
    export { CKEditor };
  }
  ```

- Intermittent error in console (`TypeError: Cannot read property 'destroy' of null`)

  - [#241](https://github.com/ckeditor/ckeditor5-react/issues/241)
  - [#197](https://github.com/ckeditor/ckeditor5-react/issues/197)

  - The fix was to avoid using dynamic import and instead use useEffect. Unable to identify the root-cause, though.

### Next Transalate

[Next Translate](https://www.npmjs.com/package/next-translate) is used for internationalization (i18n).

<!-- [ ] - more components to be added -->

# Configuring ESLint & Prettier (and making them work together!)

## Install & configure Prettier

Prettier can be installed as a Visual Studio extension. But it is recommended to create a .prettierrc file and include intial configuration values

### Configure Prettier

Put a .prettierrc file in the root folder of the project

```json
{
  "prettier.singleQuote": true,
  "prettier.jsxSingleQuote": true
}
```

### Run prettier once on [all files](https://levelup.gitconnected.com/how-to-format-all-files-in-a-directory-with-prettier-5f0ff5f4ffb2)

`npx prettier --write .`

## Install & configure ESLint (extension uses it internally)

### Install ESLint

`npm install eslint`

### Configure ESLint

Create an ".eslintrc" configuration file using VS Code Command "Create ESLint configuration"

```
✔ How would you like to use ESLint? · style
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · react
✔ Does your project use TypeScript? · No / Yes
✔ Where does your code run? · browser
✔ How would you like to define a style for your project? · guide
✔ Which style guide do you want to follow? · google
✔ What format do you want your config file to be in? · JavaScript
```

### Configure ESLint configuration to work with Pettier

Install eslint-config-prettier package (`npm install --save-dev eslint-config-prettier`)

[Disable the following rules](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#eslint) (.eslintrc.js) in as they are no longer required due to [New JSX Transform](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html)

```json
{​​​
   // ...
   "rules": {​​​​​​​​​​
   // ...
   "react/jsx-uses-react": "off",
   "react/react-in-jsx-scope": "off"
   }​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​
}​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​
```

[Turn off all rules](https://github.com/prettier/eslint-config-prettier)​​​​​​​ that are unnecessary or might conflict with Prettier by adding "prettier" to the "extends" array in .eslintrc.\* file. Make sure to put it last

```json
{​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​
  "extends": [
    "some-other-config-you-use",
    "prettier"
  ]
}​​
```

## Install & Configure Visual Studio extensions

### Install extensions for Prettier & ESlint

- Prettier
- ESLint

### Configure Visual Studio for ESLint & Prettier

Add the following to the workspace settings file

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "eslint.format.enable": true,
  "editor.tabSize": 2
}
```

### Restart Visual Studio!
