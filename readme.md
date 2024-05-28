# Simplified Electronic Invoice Web System

### Description
The project consists of the creation of a web system in Java using Spring Boot for the backend and React for the frontend, for the management of electronic invoices, storing the data in a MySQL database. The system will allow suppliers of goods or services to register and make electronic invoicing of sales to their customers, with features such as supplier registration, profile configuration, customer and product registration, invoicing, viewing of invoices in PDF and XML, and system administration.

### Functionalities
1. Supplier Registration
2. Supplier Profile Setup
3. Register Customers
4. Register Products
5. Invoice
6. View Invoices
7. Manage System

### Technologies Used
- Backend:
  - Java
  - Spring Boot
  - MySQL Driver (JDBC)
  - MySQL
- Frontend:
  - React
  - React Router
- Other Tools:
  - Maven
  - Git
  - IntelliJ IDEA (or preferred IDE)

### Installation Process

#### Prerequisites
1. Java Development Kit (JDK) installed (version 8 or higher).
2. Apache Maven installed.
3. MySQL server installed and running.
4. Node.js installed.
5. A compatible web server such as Apache Tomcat (for the backend).

#### Steps:

1. **Clone the Project Source Code**
   - Clone the project repository from the designated location.
   ```bash
   git clone https://github.com/CharlyCR3110/Facturas-Electronicas-API
   ```

2. **Configure MySQL Database**
   - Execute the SQL script provided in the project's `database` directory to create the necessary database and tables.

   ``` bash
    mysql -u <your_mysql_username> -p < database/01_CreateTables.sql
    ```

    ``` bash
    mysql -u <your_mysql_username> -p < database/02_Triggers.sql
    ```

    Optional: 
    ``` bash
    mysql -u <your_mysql_username> -p < database/03_TestData.sql
    ```
    
    - You can also use a MySQL client tool to execute the script.

3. **Update Database Configuration**
   - Navigate to the backend project's configuration directory.
   ```bash
   cd api_facturas/src/main/resources/
   ```
   - Open `application.properties` file and update the database connection properties.
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/facturas_electronicas_api
   spring.datasource.username=your_mysql_username
   spring.datasource.password=your_mysql_password
   ```

4. **Build and Run the Backend**
   - Navigate to the root directory of the backend project.
   ```bash
   cd api_facturas
   ```
   - Execute Maven build to compile and package the project.
   ```bash
   mvn clean package
   ```
   - Run the Spring Boot application.
   ```bash
   java -jar target/<your_project_name>.jar
   ```

5. **Configure and Run the Frontend**
   - Navigate to the frontend project directory.
   ```bash
   cd client_facturas/
   ```
   - Install frontend dependencies.
   ```bash
   npm install
   ```
   - Start the frontend server.
   ```bash
   npm run dev
   ```

7. **Access the Application**
   - Once both backend and frontend servers have started, open a web browser and navigate to:
   ```
   http://localhost:5173/
   ```

8. **Enjoy Using the Electronic Invoice System!**
   - You can now use the system to manage electronic invoices, register suppliers, customers, products, and more.

### Note:
- Ensure that your MySQL server is running before starting the installation process.
- Customize the installation steps as per your specific environment and requirements.
- For production deployment, consider configuring security measures and optimizations.