// (Delete modal responding but nothing deleting)


// Global veriable 
let all_id = null;
let all_Depertment = null;
let all_Location = null;
let deptLocNames = null;
let deptNames = null;

//Calling back function
getAllPersonnel();
getAllDepartment();
getAllLocation();


//DOM
let search = document.querySelector('#searchInp');
let searchListItems = document.querySelector('tr');

const searchFilter = (searchName) => {
  console.log(Array.from(searchListItems.children));
}

//**************************  Search Input  ***********************************************
$("#searchInp").on("keyup", function () {
    let searchName = search.value.trim();
    searchFilter(searchName);

// w3 example

    // $(document).ready(function(){
    //   $("#myInput").on("keyup", function() {
    //     var value = $(this).val().toLowerCase();
    //     $("#myTable tr").filter(function() {
    //       $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    //     });
    //   });
    // });

    
  });
  
//****************************  Refresh-Button  *********************************************
  $("#refreshBtn").click(function () {
    if ($("#personnelBtn").hasClass("active")) {
      alert("refresh personnel table");
    } else {
      if ($("#departmentsBtn").hasClass("active")) {
        alert("refresh department table");
      } else {
        alert("refresh location table");
      }
    }
  });
  


//*****************************  Get All Personnel-Data on the table  ***********************************
function getAllPersonnel(){
        $.ajax({
        type: 'GET',
        url: "libs/php/getAll.php",
        data: {},
        dataType: 'json',
        success: function(allResults) {
        console.log("All Employees Data:", allResults)
				if (allResults.status.name == "ok") {

        let personnelData = allResults.data;
        for (const employee of personnelData) {
          $('#tableBody').append(
            `<tr>
            <td class="align-middle text-nowrap d-none d-md-table-cell">
                <label for="lastName" class=" col-form-label">${employee.lastName} </label> 
            </td>
            <td class="align-middle text-nowrap d-none d-md-table-cell">
                <label for="firstName" class= "col form-label">${employee.firstName} </label> 
            </td>
            <td class="align-middle text-nowrap d-none d-md-table-cell">
                <label for="email" class=" col-form-label">${employee.email}</label>
            </td>
            <td class="align-middle text-nowrap d-none d-md-table-cell">
                <label for="jobTitle" class="col-form-label" >${employee.jobTitle} </label> 
            </td>
            <td class="align-middle text-nowrap d-none d-md-table-cell">
                <label for="department" class="col form-label" >${employee.department}</label>
            </td>
            <td class="align-middle text-nowrap d-none d-md-table-cell">
                <label for="location" class="col form-label">${employee.location}</label>
            </td>

            <td class="text-end text-nowrap action">
                <button type="button" class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#editPersonnelModal" data-id="${employee.id}">
                    <i class="fas fa-user-plus"></i><br>
                    edit
              </button>
                <button type="button" class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#deletePersonnelBtn" data-id="${employee.id}">
                <i class="fas fa-trash"></i><br>
                delete
              </button>
            </td>
          </tr>`
          );
         }

         $("[data-bs-target='#deletePersonnelBtn']").click(function (e) {
          all_id = ($(this).data('id'));
          console.log($(this).data('id'));

          // $('#deletePersonnel').data('id', $(this).data('id'));
          $('#deletePersonnel').data('id', all_id);
         
        });
          }
        },
            error: function(jqXHR, textStatus, errorThrown) {
              console.log(jqXHR);
      }
    });
  };


//*********************************** Get Depertment Data on the table *******************************************
function getAllDepartment(){
        $.ajax({
        type: 'GET',
        url: "libs/php/getAllDept.php",
        data: {},
        dataType: 'json',
        success: function(deptResults) {
          // console.log("Depertment Data:", deptResults)
				if (deptResults.status.name == "ok") {

        let deptData = deptResults.data;

         for (const depertment of deptData) {
          $('#deptBody').append(
            ` <tr>
            <td class="align-middle text-nowrap">
                <label for="newDepartment" class=" col-form-label">${depertment.name}</label> 
            </td>
            <td class="align-middle text-nowrap d-none d-md-table-cell">
                <label for="newLocation" class=" col-form-label">${depertment.location}</label> 
            </td>
            <td class="align-middle text-end text-nowrap">
                <button type="button" class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#editDepartmentBtn" data-id="${depertment.id}">
                    <i class="fas fa-building fa-lg fa-fw"></i><br>
                    edit
              </button>
                <button type="button" class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#deleteDepartmentBtn" data-id="${depertment.id}">
                    <i class="fas fa-trash"></i><br>
                delete
              </button>
            </td>
          </tr>`
          );
         }

         $("[data-bs-target='#deleteDepartmentBtn']").click(function (e) {
          console.log($(this).data('id'));

          $('#deleteDepartment').data('id', $(this).data('id'));
        });


          }
        },
            error: function(jqXHR, textStatus, errorThrown) {
              console.log(jqXHR);
      }
    });
  };

//************************************* Get Location-Data on the table********************************************
function getAllLocation(){
        $.ajax({
        type: 'GET',
        url: "libs/php/getAllLoc.php",
        data: {},
        dataType: 'json',
        success: function(locResults) {
          // console.log("Location Data:", locResults)
				if (locResults.status.name == "ok") {

        let locData = locResults.data;
         for (const location of locData) {
          $('#locBody').append(
            ` <tr>
            <td class="align-middle text-nowrap d-none d-md-table-cell">
                <label for="newLocation" class=" col-form-label">${location.location}</label> 
            </td>
            <td class="align-middle text-end text-nowrap">
                <button type="button" class="btn btn-warning btn-sm" data-bs-toggle="modal" 
                data-bs-target="#editLocationBtn" data-id="${location.id}">
                <i class="fas fa-building fa-lg fa-fw"></i><br>
                edit
              </button>
                <button type="button" class="btn btn-warning btn-sm" data-bs-toggle="modal" 
                data-bs-target="#deleteLocationtBtn" data-id="${location.id}">
                <i class="fas fa-trash"></i><br>
                delete
              </button>
            </td>
          </tr>`
          );
         }

         $("[data-bs-target='#deleteLocationtBtn']").click(function (e) {
          console.log($(this).data('id'));
          $('#deleteLocation').data('id', $(this).data('id'));
        });


          }
        },
            error: function(jqXHR, textStatus, errorThrown) {
              console.log(jqXHR);
      }
    });
  };


//....................................Personnel.......................................
// ************************* Editing Personnel Form ********************************************

  $("#editPersonnelModal").on("show.bs.modal", function (e) {
    $.ajax({
      url:"libs/php/getPersonnelByID.php",
      type: "POST",
      dataType: "json",
      data: {
        id: $(e.relatedTarget).attr("data-id") // Retrieves the data-id attribute from the calling button
      },
      success: function (result) {

        var resultCode = result.status.code;

        if (resultCode == 200) {
          // Update the hidden input with the employee id so that
          // it can be referenced when the form is submitted
          $("#editPersonnelEmployeeID").val(result.data.personnel[0].id);
          $("#editPersonnelLastName").val(result.data.personnel[0].lastName);
          $("#editPersonnelFirstName").val(result.data.personnel[0].firstName);
          $("#editPersonnelJobTitle").val(result.data.personnel[0].jobTitle);
          $("#editPersonnelEmailAddress").val(result.data.personnel[0].email);
          $("#editPersonnelDepartment").html("");
  

          $.each(result.data.department, function () {
            $("#editPersonnelDepartment").append(
              $("<option>", {
                value: this.id,
                text: this.name
              })
            );
          });
          $("#editPersonnelDepartment").val(result.data.personnel[0].departmentID);
          
        } else {
          $("#editPersonnelModal .modal-title").replaceWith(
            "Error retrieving data"
          );
        }

      },
      error: function (jqXHR, textStatus, errorThrown) {
        $("#editPersonnelModal .modal-title").replaceWith(
          "Error retrieving data"
        );
      }
    });
  });



// ***************************** Submit  Edit Personnel  ************************************

      // Executes when the form button with type="submit" is clicked
      $("#editPersonnelForm").on("submit", function (e) {
        // stop the default browser behviour
        e.preventDefault();
    
        // AJAX call to save form data
        $.ajax({
          type: 'POST',
          url: "libs/php/updatePersonnel.php",
          data: {
            id: $("#editPersonnelEmployeeID").val(),
            lastName:  $("#editPersonnelLastName").val(),
            firstName: $("#editPersonnelFirstName").val(),
            jobTitle:  $("#editPersonnelJobTitle").val(),
            email:  $("#editPersonnelEmailAddress").val(),
            departmentID: $("#editPersonnelDepartment").val(),
            locationID: $('#editPersonnelLocation').val(),
          },

          dataType: 'json',
          success: function(results) {
            console.log(results);
            location.reload();
          },
          error: function(jqXHR, textStatus, errorThrown) {
              console.log(errorThrown);
          }
      }) 
      });

// ***************************** Delete Personnel Modal************************************
let personnelIdDeleted = document.querySelector('#deletePersonnelWithId');

$("#deletePersonnelBtn").on("show.bs.modal", function (e) {
  console.log($(e.relatedTarget).attr("data-id"));
  // $('deletePersonnelWithId').html(`${this.data('id')}`);

});

$("#deletePersonnel").click(function(){
    console.log($(this).data('id'));

    // $('#deletePersonnelWithId').append(`${this.data('id')}`);
    // $('deletePersonnelWithId').html(`${this.data('id')}`);

      $('#deleteConfirm').html(`${$('#addpersonnel').html()}`);
        $(`#deletePersonnel`).on('click', event => {
  // write delete personnel ajax request using $(this).data('id') as the personnel id
          $.ajax({
            type: 'POST',
            url: "libs/php/deletePersonnelByID.php",
            data: {
              id: $(this).data('id'),
            },
            dataType: 'json',
            success: function(results) {
              console.log(results);
              location.reload();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
          });
        })
});

// ***************************** Adding Personnel Modal************************************

$("#addPersonnelModal").on("show.bs.modal", function (e) {
  $.ajax({
    url:"libs/php/insertPersonnel.php",
    type: "POST",
    dataType: "json",
    data:{
      lastName :  $("#editPersonnelLastName").val(),
      firstName: $("#editPersonnelFirstName").val(),
      email: $("#editPersonnelEmailAddress").val(),
      jobTitle: $("#editPersonnelJobTitle").val(),
      departmentID: $("#editPersonnelDepartment").val(),
      locationID: $('#editPersonnelLocation').val(),
      // id: $(e.relatedTarget).attr("data-id") // Retrieves the data-id attribute from the calling button
    },
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {
      console.log(result);
      }

    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#addPersonnelModal .modal-title").replaceWith(
        "Error retrieving data"
      );
    }
  });
});

// **********************************  Personnel ADD-MODAl for Department ***********************
$.ajax({
  type: 'GET',
  url: "libs/php/getAllDept.php",
  data: {},
  dataType: 'json',
  success: function(deptResults) {
    // console.log("Location Data:", locResults)
    if (deptResults.status.name == "ok") {
      console.log(deptResults)
      
      for (const department of deptResults.data) {
        $('#addPersonnelDepartment').append(`<option value='${department.id}'>${department.name}</option>`);
      }
    }
  }
});

// ********************************** Personnel ADD-MODAl for Location ***********************
$.ajax({
  type: 'GET',
  url: "libs/php/getAllLoc.php",
  data: {},
  dataType: 'json',
  success: function(locResults) {
    // console.log("Location Data:", locResults)
    if (locResults.status.name == "ok") {
    console.log(locResults)

    for (const location of locResults.data) {
      $('#addPersonnelLocation').append(`<option value='${location.id}'>${location.location}</option>`);
    }
  }
}
});


//***************************** Submit Adding Personnel ************************************
$("#addPersonnelForm").on("submit", function (e) {
  e.preventDefault();
  // AJAX call to save form data
  $.ajax({
    type: 'POST',
    url: "libs/php/insertPersonnel.php",
    data: {
      lastName:  $("#addPersonnelLastName").val(),
      firstName: $("#addPersonnelFirstName").val(),
      jobTitle:  $("#addPersonnelJobTitle").val(),
      email:  $("#addPersonnelEmailAddress").val(),
      departmentID: $("#addPersonnelDepartment").val(),
      locationID: $("#addPersonnelLocation").val(),
    },
    dataType: 'json',
    success: function(results) {
      console.log(results);
      //location.reload();
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
        console.log(errorThrown);
    }
}) 
});





//.........................................Department.......................................
// ************************* Editing Department Form ********************************************
$("#editDepartmentBtn").on("show.bs.modal", function (e) {
  $.ajax({
    url:"libs/php/getDepertmentByID.php",
    type: "POST",
    dataType: "json",
    data: {
      id : $(e.relatedTarget).attr("data-id"),
    },
    success: function (result) {
      console.log(result);

      let resultCode = result.status.code;
      if (resultCode == 200) {
        $("#editDepartmentId").val(result.data.department[0].id);
        $("#editDepartmentName").val(result.data.department[0].name);
        $("#editDeptLocationName").val(result.data.department[0].locationID);

        $.each(result.data.department, function () {
          $("#editDepartmentName").append(
            $("<option>", {
              value: this.id,
              text: this.name
            })
          );
        });
        $("#editDepartmentName").val();
      } else {
        $("#editDepartmentName .modal-title").replaceWith(
          "Error retrieving data"
        );
        }

    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#editDepartmentName .modal-title").replaceWith(
        "Error retrieving data"
      );
    }
  });
});

// ***************************** Submit Button for Edit Department Form ************************************
$("#editDepartmentForm").on("submit", function (e) {
  // stop the default browser behviour
  e.preventDefault();

  // AJAX call to save form data
  $.ajax({
    type: 'POST',
    url: "libs/php/updateDepartment.php",
    data: {
      name:$("#editDepartmentName").val(),
      locationID: $("#editDeptLocationName").val(),
      departmentID:$("#editDepartmentId").val(),
    },

    dataType: 'json',
    success: function(results) {
      console.log(results);
      location.reload();
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
    }
}) 
});


// ***************************** Adding Department Modal************************************
$("#addDepartment").on("show.bs.modal", function (e) {
  $.ajax({
    url:"libs/php/getDepertmentByID.php",
    type: "POST",
    dataType: "json",
    data:{
      name: $("#addDepartmentName").val(),
      locationID: $("#addDeptLocationName").val(),
    },
    success: function (result) {
      var resultCode = result.status.code;
      console.log(result);

      if (resultCode == 200) {
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#addDepartment .modal-title").replaceWith(
        "Error retrieving data"
      );
    }
  });
});

//*****************************  Adding Department Submit ************************************
$("#addDepartmentForm").on("submit", function (e) {
  e.preventDefault();
  // AJAX call to save form data
  $.ajax({
    type: 'POST',
    url: "libs/php/insertDepartment.php",
    data: {
      name: $("#addDepartmentName").val(),
      locationID: $("#addDeptLocationName").val(),
    },
    dataType: 'json',
    success: function(results) {
      location.reload();
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
    }
}) 
});


// ***************************** Delete Department ************************************
$("#deleteDepartmentBtn").on("show.bs.modal", function (e) {
  console.log($(e.relatedTarget).attr("data-id"));

$("#deleteDepartment").click(function(){
    console.log($(this).data('id'));

        $(`#deleteDepartment`).on('click', event => {
  // write delete personnel ajax request using $(this).data('id') as the personnel id
          $.ajax({
            type: 'POST',
            url: "libs/php/deleteDepartmentByID.php",
            data: {
              id: $(this).data('id'),
            },
            dataType: 'json',
            success: function(results) {
              console.log(results);
              location.reload();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
          });
        })
});
});





//................................Location.......................................
// ***************************Edit Location Modal ***********************************
$("#editLocationBtn").on("show.bs.modal", function (e) {
  $.ajax({
    url:"libs/php/getLocationByID.php",
    type: "POST",
    dataType: "json",
    data: {
      id : $(e.relatedTarget).attr("data-id"),
    },
    success: function (result) {
      console.log(result);

      let resultCode = result.status.code;
      if (resultCode == 200) {

        $("#editLocationId").val(result.data.location[0].id);
        $("#editLocationNames").val(result.data.location[0].name);

        $.each(result.data.location, function () {
          $("#editLocationNames").append(
            $("<option>", {
              value: this.id,
              text: this.name
            })
          );
        });
        $("#editLocationNames").val();
      } else {
        $("#editLocationNames .modal-title").replaceWith(
          "Error retrieving data"
        );
        }

    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#editLocationNames .modal-title").replaceWith(
        "Error retrieving data"
      );
    }
  });
});


// *****************************  Edit Location Submit ************************************
$("#editLocationForm").on("submit", function (e) {
  // stop the default browser behviour
  e.preventDefault();

  // AJAX call to save form data
  $.ajax({
    type: 'POST',
    url: "libs/php/updateLocation.php",
    data: {
      name:$("#editLocationNames").val(),
      locationID: $("#editLocationId").val(),
    },

    dataType: 'json',
    success: function(results) {
      console.log(results);
      location.reload();
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
    }
}) 
});

// ***************************** Adding Location Modal************************************
$("#addLocation").on("show.bs.modal", function (e) {
  $.ajax({
    url:"libs/php/getLocationByID.php",
    type: "POST",
    dataType: "json",
    data:{
      name: $("#addNewLocation").val(),
    },
    success: function (result) {
      var resultCode = result.status.code;
      console.log(result);

      if (resultCode == 200) {
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#addLocation .modal-title").replaceWith(
        "Error retrieving data"
      );
    }
  });
});

//***************************** ADD Department Submit ************************************
$("#addLocationForm").on("submit", function (e) {
  e.preventDefault();
  // AJAX call to save form data
  $.ajax({
    type: 'POST',
    url: "libs/php/insertLocation.php",
    data: {
      name: $("#addNewLocation").val(),
    },
    dataType: 'json',
    success: function(results) {
      location.reload();
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
    }
}) 
});


// ***************************** Delete Location************************************
$("#deleteLocationtBtn").on("show.bs.modal", function (e) {
  console.log($(e.relatedTarget).attr("data-id"));
});

$("#deleteLocation").click(function(){
    console.log($(this).data('id'));

    $('#deletePersonnelWithId').append(`${this.data('id')}`);
    // $('deletePersonnelWithId').html(`${this.data('id')}`);

      $('#deleteConfirm').html(`${$('#deleteLocation').html()}`);
        $(`#deleteLocation`).on('click', event => {
  // write delete personnel ajax request using $(this).data('id') as the personnel id
          $.ajax({
            type: 'POST',
            url: "libs/php/deleteLocationByID.php",
            data: {
              id: $(this).data('id'),
            },
            dataType: 'json',
            success: function(results) {
              console.log(results);
              location.reload();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
          });
        })
});



