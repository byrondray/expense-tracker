# Expense Tracker

This is a basic expense tracker that uses NextJs, Postgres and Drizzle ORM to track your expenses. Check out the live version of the app. https://expense-tracker-sand-phi.vercel.app/. 

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/qxZTySxn)
# Instructions

You are building this expense app.

This project currently has a small amount of code in it but nothing is functional. It's just some hard coded placeholder JSX, you'll need to implement everything.

If you run `npm install` then `npm dev`, you'll be able to see the basic ui setup. Feel free to change this as much as you want, but you can just use the existing UI if you want.

## Database

### Setup the Drizzle Schema

> Note: we are using a normal postgres database for this project, not neon. It's basically the same thing but the imports are a bit different.
> But that part's already setup for you.

https://www.nexttonone.lol/setup-drizzle

Create the drizzle schema for `Expenses` and `Categories` tables.

- An expense contains an `id`, `amount`, `description`, `date`, and `categoryId`.
- A Category contains an `id` and a `name`.

**ERD:**
https://link.excalidraw.com/readonly/EkDyKUN9XGYAJOSIIRq5?darkMode=true

<iframe src="https://link.excalidraw.com/readonly/EkDyKUN9XGYAJOSIIRq5?darkMode=true" width="100%" height="100%" style="border: none;"></iframe>

Users will be able to create new expenses that are associated with a single category, but the categories will be pre-populated in the database.

**Notes:**

- amount should use the `numeric` type to handle money correctly. `numeric("amount", { precision: 10, scale: 2 })`.
- Date will only contain the date value (day, month, year), not the entire timestamp. `date("date")`.
- categoryId will need a foreign key constarint to the categories table.

### Environment Variables

I've already made a database for you. Your database `name` and `username` are both your username in d2l. This is your `@my.bict.ca` email address without the `@my.bict.ca` part.

Your password is `a_secure_password_1`

So if your email is `username@my.bict.ca` then your database name is `username`, your username is `username` and your password is `a_secure_password_1`.

```sh
MIGRATION_DATABASE_URL='postgres://username:a_secure_password_1@35.95.93.111/username'
DATABASE_URL='postgres://username:a_secure_password_1@35.95.93.111/username'
```

Copy and paste those urls into your `.env.local` file and do a find and replace to replace all `username` with your D2L username.

### Push

You should be able to view your database in drizzle studio. If you do, you'll notice no tables yet.

Push the schema to your database https://www.nexttonone.lol/setup-drizzle#push

### Add Data

Use drizzle studio to add some custom categories, then add some expenses that are associated with those categories. You don't have to add many, just enough to test your app.

---

## View Expenses

When the page loads, select all the expenses from the database and display them in a list. Make sure you join the expenses table to the categories table so you can display the category name instead of the category id.

---

## Create Expense

### Create Expense Form Categories

You will need to query the categories from the database and display them in the select field. It will look something like this:

**parent server component**

```tsx
const categories = select().from(categories)

// ...

<CreateExpenseForm categories={categories}>
```

**CreateExpenseForm client component**

```tsx
"use client"
import { useState } from "react"

export default function CreateExpenseForm({
  categories,
}: {
  categories: Category[]
}) {

  const [selectedCategory, setSelectedCategory] = useState(categories[0].id)

  return (
    //...

  <select
    value={selectedCategory}
    onChange={handleChange}
  >
    {categories.map((category) => (
      <option key={category.id} value={category.id}>
        {category.name}
      </option>
    ))}
  </select>

```

### Create Expense Server Action

When the user submits the form, the expense should be added to the database. To achieve this, you will need to create a server action that inserts the expense into the database, then call that server action from the client form component. Here are the requirements:

- Submitting the form should call the server action and pass all the form data to the server
- The client component should got into a loading state while the server action is running
- When the server succesfully creates the expense, the page should revalidate to show the new expense in the list 

### Create Expense Client Component

> this part can be a bit tricky, so you can do the other sections first and come back to this if you prefer

- Turn the form into a client component which means pulling out the server action and the database query for categories into a parent component.
- Keep track of the form data in the client component state, and submit the server action from the `onSubmit` handler
- Have the form should reset to its initial state when it's submitted successfully
- On error, the client should display the error message and the form should not reset
- Use server and client side validation to ensure that an expense description contains at least 3 characters.

---

## Delete Expense

When the user clicks the delete button, the expense should be deleted from the database. To achieve this, you will need to create a server action that deletes the expense from the database, then call that server action from the button client component. Here are the requirements:

- Clicking the delete button should call the server action and pass the expense id to the server
- The client delete button should got into a loading state while the server action is running
- When the server succesfully deletes the expense, the page should revalidate to remove the expense from the list
- On error, the client should display the error message.

## Suspense

The form and the list of expenses both depend on a database query before they can be displayed. Use suspense to display a loading indicator while the queries are running. There should be two suspense boundaries, one for the form and one for the list of expenses. Something like this:

```tsx
<Suspense fallback={<CreateExpenseFormSkeleton />}>
  <CreateExpenseForm />
</Suspense>
<Suspense fallback={<ExpenseListSkeleton />}>
  <ExpenseList />
</Suspense>
```

`CreateExpenseForm` and `ExpenseList` will both need to be async server components that perform the database queries. You may need to wrap your existing components to make this work.

You get part marks for implementing suspense and the rest of the marks for implementing a skeleton for each suspsense boundary.

## View By Date

Implement a way of viewing expenses by date. This will involve updating the UI to allow showing by date and changing the query to filter by date on the server. 

You can do this however you want, but here's one way:

localhost:3000?date=2024-01-01

https://nextjs.org/docs/app/api-reference/file-conventions/page#searchparams-optional

**do not filter the results in JavaScript**

Use a where clause to filter the expenses by date.

---

## Rubric

| Criteria                                                     | Points  | Comments                                                                                             |
| ------------------------------------------------------------ | ------- | ---------------------------------------------------------------------------------------------------- |
| Drizzle Schema Setup                                         | 5       | The schema is setup correctly and pushed or migrated to the databse                                  |
| View Expenses                                                | 10      | select and joint the tables correctly and display the information                                    |
| Create Expense Form Categories                               | 10      | select just the categories and display them in the expense tracker select dropdown                   |
| Error Handling                                               | 10      | try catch server errors and display something to the user if something fails                         |
| Create Expense Form Submission                               | 15      | use a server action to submit a new expense and save it in the database                              |
| Create Expense Form Client                                   | 10      | Use a client component for the form                                                                  |
| Delete Expense                                               | 10      | use a server action to delete an expense                                                             |
| Suspense                                                     | 10      | use suspense to show loading indicators                                                              |
| View By Date                                                 | 10      | Allow the user to filter by date                                                                     |
| code quality, css style, appropriate number of commits, etc. | 10      | Code in a similar style to what we've been writing in class, commit frequently, don't write bad code |
| **Total**                                                    | **100** |                                                                                                      |
