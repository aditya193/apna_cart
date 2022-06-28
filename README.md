# apna_cart

<h3>About Project: </h3>
<ul>
  <li>Apna Cart is an E-commerce Website</li>
  <li>Website Faciliates two type of users Admin and Customer, their roles are:
    <ul>
      <li><b>Admin:</b>
        <ol>
          <li>Admin is Seller, who can sell products, add his or her products and manage orders of their products</li>
          <li>Admin can track order and change the status of order as well</li>
          <li>Admin can delete the Product, if he or she wants</li>
        </ol>
      </li>
      <li><b>Customer: </b>
        <ol>
          <li>Customer is Buyer who can buy the products</li>
          <li>Customer can buy multiple products as well as products of multiple seller</li>
          <li>Customer can add product into the cart</li>
          <li>Customer can place the order of items that were added to the cart</li>
          <li>Customer can also track their orders</li>
        </ol>
      </li>
    </ul>
  </li>
  <li>Registration of Admins is done manually</li>
  <li>User can register from the website</li>
  <li>Password is hashed before storing into the database</li>
  <li>Password validation is also there</li>
    <ul>
      <li>Password length must be atleast 8</li>
      <li>Password must contain atleast one digit from 0-9</li>
      <li>Password must conatin atleast one letter from upper alphabet A-Z</li>
      <li>Password must contain atleast one letter from lower alphabet a-z</li>
      <li>Password must conatin atleat one special character like !,@,#,$,%,? etc</li>
    </ul>
  </li>
  <li>Admin and customer can login with their correct email id and password</li>
  <li>Once they logged in their session will be maintained till they logout from the website</li>
  </ul>
  
  <h3>Technologies used: </h3>
  <ul>
  <li><b>Frontend: </b>HTML,CSS,JAVASCRIPT,EJS</li>
  <li><b>Backend: </b>Node.js,Express.js</li>
  <li><b>Database: </b>MySQL</li>
  </ul>
  
  <h3>Code and Database Structure:</h3>
  <ul>
  <li>The Website is based on MVC Pattern.</li>
  <li>The Database Contains four Tables
    <ol>
      <li><b>users: </b>Primary key is <i>id</i></li>
      <li><b>products: </b>Primary key is <i>id</i></li>
      <li><b>admin: </b>Primary key is <i>adminId</i></li>
      <li><b>orders: </b>Primary key is <i>id</i> and foreign key are <i>user_id</i>, <i>product_id</i>, <i>admin_id</i></li>
    </ol>
  </li>
  </ul>
  
  <h3>Installation: </h3>
  <ul>
    <li>Clone or Download the Project in zip format</li>
    <li>Go through the comments.txt file to setup database and create schemas</li>
    <li>Connect database to project by entering your database local server credentials</li>
    <li>Install node packages by running npm install command on terminal</li>
    <li>Open terminal and type npm start</li>
    <li>Open browser and type localhost:3000</li>
  </ul>
