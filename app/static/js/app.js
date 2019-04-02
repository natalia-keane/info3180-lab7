/* Add your Application JavaScript */
Vue.component('app-header', {
    template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <a class="navbar-brand" href="#">Lab 7</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Form <span class="sr-only"></span></router-link>
          </li>
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Upload <span class="sr-only"></span></router-link>
          </li>
        </ul>
      </div>
    </nav>
    `
});

Vue.component('app-footer', {
    template: `
    <footer>
        <div class="container">
            <p>Copyright &copy; Flask Inc.</p>
        </div>
    </footer>
    `
});

const Home = Vue.component('home', {
   template: `
    <div class="jumbotron">
        <h1>Lab 7</h1>
        <p class="lead">In this lab we will demonstrate VueJS working with Forms and Form Validation from Flask-WTF.</p>
    </div>
   `,
    data: function() {
       return {}
    }
});

const Upload = Vue.component('uploadForm', {
   template: `
   <h1>Upload Form</h1>
    <div class="uploads">
      <form id="uploadForm" enctype='multipart/form-data' method='POST' @submit.prevent="uploadPhoto">
      <br><br>
      <label for='description'>
        <h3>Description</h3></label>
        <textarea id='description' class ='form-control' name='description'></textarea>
        <br>
        <label for='photo'>
          <h3>Photo</h3></label>
          <input type="file" id= 'photo' name="photo" class="btn btn-primary mb-2">Upload File</button>
          <br>
          <input type="submit" value="submit" class="btn btn-primary mb-2">Upload File</button>
      </form>

    </div>
   `,
    data: function() {
       return {
         response:{}.
         errors:[]
       }
    },
    created: function(){
      let uploadForm = document.getElementById('uploadForm');
      let form_data = new FormData(uploadForm);
      fetch("/api/upload", {
        method: 'POST',
        body: form_data,
        headers: {
          'X-CSRFToken': token
        },
        credentials: 'same-origin'
      })
      .then(function (response) {
          return response.json();
          })
      .then(function (jsonResponse) {
// display a success message
        console.log(jsonResponse);
      })
      .catch(function (error) {
           console.log(error);
        })
      },
      methods: {
             uploadPhoto: function() {

             fetch("/api/upload", {
               method: 'POST'
             })
             .then(function (response) {
               return response.json();
             })
             .then(function (jsonResponse) {
// display a success message
                console.log(jsonResponse);
              })
              .catch(function (error) {
                console.log(error);
              });
           }

         }

});

const NotFound = Vue.component('not-found', {
    template: `
    <div>
        <h1>404 - Not Found</h1>
    </div>
    `,
    data: function () {
        return {}
    }
})

// Define Routes
const router = new VueRouter({
    mode: 'history',
    routes: [
        {path: "/", component: Home},
        // Put other routes here
        {path: "/uploadForm", component: Form},
        {path: "/", component: Upload},
        // This is a catch all route in case none of the above matches
        {path: "*", component: NotFound}
    ]
});

// Instantiate our main Vue Instance
let app = new Vue({
    el: "#app",
    router
});
