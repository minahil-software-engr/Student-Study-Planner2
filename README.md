Study Planner

Ye ek simple Study Planner web app hai jahan user apne study tasks add, edit, delete aur filter kar sakta hai.

Technologies

HTML,CSS,JavaScript,DOM,Local Storage

CRUD Operations

Create:New task add karna.
Read:Local Storage se tasks read karke screen par show karna.
Update: Existing task ko edit karke update karna.
Delete: Task ko list aur Local Storage se remove karna.

Local Storage

Tasks browser ke Local Storage mein save hote hain. Is wajah se page refresh karne ke baad bhi tasks delete nahi hote.
Har user ke naam ke according uska task data separately save hota hai.

Event Delegation

Task list ke parent ul par ek event listener lagaya gaya hai. Isi ek listener ke through dynamically created Edit, Save aur Delete buttons ko handle kiya gaya hai.

Filtering

User tasks ko status ke according filter kar sakta hai: All, Pending, Completed

Reading Mode

Information section mein Reading Mode diya gaya hai. Button press karne par paragraphs ka color change hota hai aur dobara press karne par normal ho jata hai.

Main Logic

Sab se pehle user welcome screen par apna naam enter karta hai. Naam ko trim aur lowercase kiya jata hai aur validation ke through check kiya jata hai ke input empty ya invalid na ho.
Agar naam valid ho to welcome section hide ho jata hai aur dashboard show ho jata hai.
User ke naam ko Local Storage ki key ke taur par use kiya gaya hai. Dashboard open hone par us naam ke against saved tasks Local Storage se retrieve kiye jate hain.

Add Task Logic

User title, subject aur status enter karta hai.
Pehle check hota hai ke title aur subject empty na hon. Agar fields valid hon to ek task object create hota hai aur input_list array mein push kar diya jata hai.
Us ke baad updated array ko Local Storage mein save kiya jata hai aur renderList function ko call karke updated list screen par show kar di jati hai.

Render Logic

renderList function ka kaam input_list ke andar mojood tamam tasks ko screen par display karna hai.
Sab se pehle existing ul ko empty kiya jata hai taake duplicate tasks na banen.
Phir input_list ke har task ke liye ek li create hoti hai. Task ka title, subject aur status display kiya jata hai.
Saath mein Delete aur Edit buttons dynamically create hote hain aur har button ko us task ka index data-index ke through diya jata hai.

Delete Logic

Delete button par click hone ke baad us button ka data-index nikala jata hai.
Us index ki help se input_list mein se task ko splice ke through remove kiya jata hai.
Phir updated list ko Local Storage mein save karke renderList dobara call hota hai.

Edit Logic

Edit button par click hone ke baad us task ka index nikala jata hai.
Us task ki existing information input fields aur select element mein show ki jati hai.
Original title, subject aur status ki jagah edit inputs aa jate hain.
Edit button ka text Save mein change hota hai aur uski class edit se save ho jati hai.

Save Logic

Save button par click hone ke baad us task ka index nikala jata hai.
Edited input fields se new title, subject aur status liya jata hai.
Phir us index par purana task replace karke updated task input_list mein save kiya jata hai.
Updated array ko Local Storage mein store kiya jata hai aur renderList call hota hai.

Event Delegation

Har Edit, Save aur Delete button par separate event listener lagane ke bajaye ul par ek hi click event listener lagaya gaya hai.
Click hone ke baad event.target se check kiya jata hai ke user ne Delete, Edit ya Save button mein se kis par click kiya hai.
Is approach ki wajah se dynamically create hone wale buttons bhi easily handle ho jate hain.

Filter Logic

Filter buttons par click hone ke baad data-filter se selected filter nikala jata hai.
Agar filter All hai to tamam tasks show hote hain.
Agar Pending select kiya jaye to sirf pending tasks show hote hain.
Agar Completed select kiya jaye to sirf completed tasks show hote hain.
Baaki tasks ko hidden class ke through hide kar diya jata hai.

Empty Message Logic

controlEmptyMessage function check karta hai ke input_list empty hai ya nahi.
Agar koi task nahi hai to empty message show hota hai.
Agar task available ho to empty message hide kar diya jata hai.

Navigation Logic

Navigation button par click hone ke baad pehle tamam navigation buttons se active class remove hoti hai.
Phir clicked button ko active class milti hai.
Us button ke data-content ke according related section find kiya jata hai aur us section ko show kar diya jata hai.

Reading Mode Logic

Reading Mode button par click hone se readingMode ki value true ya false hoti rehti hai.
Agar reading mode enabled ho to information section ke paragraphs ka color change ho jata hai.
Dobara click karne par color normal ho jata hai aur button ka text bhi change ho jata hai.
