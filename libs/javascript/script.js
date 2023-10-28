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


//**************************  Search Input  ***********************************************
$("#searchInp").on("keyup", function () {
       var value = $(this).val().toLowerCase();
      //  console.log(value);
        $(".search tr").filter(function() {
          if($(this).text().search(new RegExp(value, "i"))<0){
            $(this).fadeOut();
          }else{
            $(this).show();
          }
        })
        });
      
// //****************************  Filtering  *********************************************
      $("#filterBtn").click(function () {
        // Open a modal of your own design that allows the user to apply a filter to the personnel table on either department or location
      });

// ***********************************Department Filter*******************************************
      $('#filterDepartments').change(function(){
        var id = $(this).val();
        // console.log(id);
        // set location filter to all locations and trigger change event
        if($('#filterLocations').val() != 0){
          $('#filterLocations').val(0).change();

        }
        // make ajax request to get filtered personnel only
        $.ajax({
          type: 'GET',
          url: "libs/php/filter_department.php",
          data: {departmentID:id},
          dataType: 'json',
          success: function(allResults) {
          // console.log("All Employees Data:", allResults)
          if (allResults.status.name == "ok") {
  
          let personnelData = allResults.data;
          $("#tableBody").html("");
          for (const employee of personnelData) {
            $('#tableBody').append(
              `<tr>
              <td class="align-middle text-nowrap">
                  <label for="lastName" class=" col-form-label">${employee.lastName} </label> 
              </td>
              <td class="align-middle text-nowrap d-md-table-cell">
                  <label for="firstName" class= "col form-label">${employee.firstName} </label> 
              </td>
              <td class="align-middle text-nowrap d-sm-none  d-md-table-cell">
                  <label for="email" class=" col-form-label">${employee.email}</label>
              </td>
              <td class="align-middle text-nowrap d-sm-none  d-md-table-cell">
                  <label for="jobTitle" class="col-form-label" >${employee.jobTitle} </label> 
              </td>
              <td class="align-middle text-nowrap d-sm-none d-md-table-cell">
                  <label for="department" class="col form-label" >${employee.department}</label>
              </td>
              <td class="text-nowrap">
                  <button type="button" class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#editPersonnelModal" data-id="${employee.id}">
                      <i class="fas fa-user-plus"></i>
                </button>
                  <button type="button" class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#deletePersonnelBtn" data-id="${employee.id}">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>`
            );
          }
  
           $("[data-bs-target='#deletePersonnelBtn']").click(function (e) {
            all_id = ($(this).data('id'));
            // console.log($(this).data('id'));
            $('#deletePersonnel').data('id', $(this).data('id'));
           
          });
            }
          },
              error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
        }
      });
      });

// ***********************************Location Filter*******************************************
      $('#filterLocations').change(function(){
        var id = $(this).val();
        // console.log(id);
        // set location filter to all locations and trigger change event
        // $('#filterDepartments').val(0).change();
        if($('#filterDepartments').val() != 0){
          $('#filterDepartments').val(0).change();

        }
        // make ajax request to get filtered personnel only
        $.ajax({
          type: 'GET',
          url: "libs/php/filter_location.php",
          data: {locationID:id},
          dataType: 'json',
          success: function(allResults) {
          // console.log("All Employees Data:", allResults)
          if (allResults.status.name == "ok") {
  
          let personnelData = allResults.data;
          $("#tableBody").html("");
          for (const employee of personnelData) {
            $('#tableBody').append(
              `<tr>
              <td class="align-middle text-nowrap">
                  <label for="lastName" class=" col-form-label">${employee.lastName} </label> 
              </td>
              <td class="align-middle text-nowrap d-md-table-cell">
                  <label for="firstName" class= "col form-label">${employee.firstName} </label> 
              </td>
              <td class="align-middle text-nowrap d-sm-none  d-md-table-cell">
                  <label for="email" class=" col-form-label">${employee.email}</label>
              </td>
              <td class="align-middle text-nowrap d-sm-none  d-md-table-cell">
                  <label for="jobTitle" class="col-form-label" >${employee.jobTitle} </label> 
              </td>
              <td class="align-middle text-nowrap d-sm-none d-md-table-cell">
                  <label for="department" class="col form-label" >${employee.department}</label>
              </td>
             
  
              <td class="text-nowrap">
                  <button type="button" class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#editPersonnelModal" data-id="${employee.id}">
                      <i class="fas fa-user-plus"></i>
                </button>
                  <button type="button" class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#deletePersonnelBtn" data-id="${employee.id}">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>`
            );
          }
           $("[data-bs-target='#deletePersonnelBtn']").click(function (e) {
            all_id = ($(this).data('id'));
            // console.log($(this).data('id'));
            $('#deletePersonnel').data('id', $(this).data('id'));
          });
            }
          },
              error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
        }
      });
      });


//****************************  Refresh-Button  *********************************************
  $("#refreshBtn").click(function () {
    if ($("#personnelBtn").hasClass("active")) {
      $("#tableBody").html(""); 
        getAllPersonnel();
    } else if($("#departmentsBtn").hasClass("active")) {
      $("#deptBody").html(""); 
        getAllDepartment();
     
    }else{
      $("#locBody").html(""); 
        getAllLocation();
      }
    });

  
  $("#addBtn").click(function () {
    // Replicate the logic of the refresh button click to open the add modal for the table that is currently on display
    if ($("#personnelBtn").hasClass("active")) {
      // open add personnel modal e.g $('#addPersonnelModal').modal('show')
      $('#addPersonnelModal').modal('show');
    }else if($("#departmentsBtn").hasClass("active")) {
      // open add department modal e.g $('#addDepartmentModal').modal('show')
      $('#addDepartmentModal').modal('show');
    }else {
      // open add location modal e.g $('#addLocationModal').modal('show')
      $('#addLocationModal').modal('show');
    }
  });
  
  $("#personnelBtn").click(function () {
    // Call function to refresh presonnel table
        $("#tableBody").html(""); 
        getAllPersonnel();
  });
  
  $("#departmentsBtn").click(function () {
    // Call function to refresh department table
        $("#deptBody").html(""); 
        getAllDepartment();
    
  });
  
  $("#locationsBtn").click(function () {
    // Call function to refresh location table
        $("#locBody").html(""); 
        getAllLocation();
  });
  


//*****************************  Get All Personnel-Data on the table  ***********************************
function getAllPersonnel(){
        $.ajax({
        type: 'GET',
        url: "libs/php/getAll.php",
        data: {},
        dataType: 'json',
        success: function(allResults) {
        // console.log("All Employees Data:", allResults)
				if (allResults.status.name == "ok") {

        let personnelData = allResults.data;
        for (const employee of personnelData) {
          $('#tableBody').append(
            `<tr>
            <td class="align-middle text-nowrap">
                <label for="lastName" class=" col-form-label">${employee.lastName} </label> 
            </td>
            <td class="align-middle text-nowrap d-md-table-cell">
                <label for="firstName" class= "col form-label">${employee.firstName} </label> 
            </td>
            <td class="align-middle text-nowrap d-sm-none  d-md-table-cell">
                <label for="email" class=" col-form-label">${employee.email}</label>
            </td>
            <td class="align-middle text-nowrap d-sm-none  d-md-table-cell">
                <label for="jobTitle" class="col-form-label" >${employee.jobTitle} </label> 
            </td>
            <td class="align-middle text-nowrap d-sm-none d-md-table-cell">
                <label for="department" class="col form-label" >${employee.department}</label>
            </td>
           

            <td class="text-nowrap">
                <button type="button" class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#editPersonnelModal" data-id="${employee.id}">
                    <i class="fas fa-user-plus"></i>
              </button>
                <button type="button" class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#deletePersonnelBtn" data-id="${employee.id}">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>`
          );
        }


         $("[data-bs-target='#deletePersonnelBtn']").click(function (e) {
          all_id = ($(this).data('id'));
          // console.log($(this).data('id'));
          $('#deletePersonnel').data('id', $(this).data('id'));
         
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
            <td class="align-middle text-nowrap d-md-table-cell">
                <label for="newLocation" class=" col-form-label">${depertment.location}</label> 
            </td>
            <td class="align-middle text-end text-nowrap">
                <button type="button" class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#editDepartmentBtn" data-id="${depertment.id}">
                    <i class="fas fa-building fa-lg fa-fw"></i>
              </button>
                <button type="button" class="btn btn-warning btn-sm delete_department_modal" data-id="${depertment.id}">
                    <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>`
          );

          $('#filterDepartments').append(`<option value='${depertment.id}'>${depertment.name}</option>`);
         }

         $('.delete_department_modal').click(function(){
          // console.log($(this).data('id'));
          $('#deleteDepartment').data('id', $(this).data('id'));
          $.ajax({
            type: 'POST',
            url:'libs/php/deleteConfirmation.php',
            data:{id:$(this).data('id')},
            dataType: 'json',
            success: function(results) {
              // console.log(results)
              if(results.data.numEmployees > 0){
                // show warning modal, cannot delete department
                $('#deleteDepartmentBtn').modal('show');
                $('#deleteDepartment').hide();
                $('#assignDepeartment').show();
                $('#depeartmentDeleteBody').hide();
              }else{
                // show normal deleteDepartmentBtn modal, delete confirmation modal
                $('#deleteDepartmentBtn').modal('show');
                $('#deleteDepartment').show();
                $('#assignDepeartment').hide();
                $('#depeartmentDeleteBody').show();



              }
            },error:function(err){
              console.log(err);
            }
          })
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
        $('#locBody').html('');
         for (const location of locData) {
          $('#locBody').append(
            ` <tr>
            <td class="align-middle text-nowrap d-md-table-cell">
                <label for="newLocation" class=" col-form-label">${location.name}</label> 
            </td>
            <td class="align-middle text-end text-nowrap">
                <button type="button" class="btn btn-warning btn-sm" data-bs-toggle="modal" 
                data-bs-target="#editLocationBtn" data-id="${location.id}">
                <i class="fas fa-building fa-lg fa-fw"></i>
              </button>
                <button type="button" class="btn btn-warning btn-sm delete_location_modal"  data-id="${location.id}">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>`
          );
          $('#filterLocations').append(`<option value='${location.id}'>${location.name}</option>`);
         }


         $('.delete_location_modal').click(function(){
          // console.log($(this).data('id'));

          $('#deleteLocation').data('id', $(this).data('id'));
          $.ajax({
            type: 'POST',
            url:'libs/php/deleteConfirmationLocation.php',
            data:{id:$(this).data('id')},
            dataType: 'json',
            success: function(results) {
              // console.log(results)
              if(results.data.numdept > 0){
                // show warning modal, cannot delete location
                $('#deleteLocationtBtn').modal('show');
                $('#deleteLocation').hide();
                $('#locationBody').hide();
                $('#assignLocation').show();


              }else{
                // show normal deleteDepartmentBtn modal, delete confirmation modal
                $('#deleteLocationtBtn').modal('show');
                $('#deleteLocation').show();
                $('#assignLocation').hide();
                $('#locationBody').show();
              }
            },error:function(err){
              console.log(err);
            }
          })
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
        // console.log(result);

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
            // console.log(results);
            // location.reload();
          $("#tableBody").html(""); 
          getAllPersonnel();

          },
          error: function(jqXHR, textStatus, errorThrown) {
              console.log(errorThrown);
          }
      }) 
      });

// ***************************** Adding Personnel Modal************************************
// **********************************  Personnel ADD-MODAl for Department ***********************
$.ajax({
  type: 'GET',
  url: "libs/php/getAllDept.php",
  data: {},
  dataType: 'json',
  success: function(deptResults) {
    // console.log("Location Data:", locResults)
    if (deptResults.status.name == "ok") {
      // console.log(deptResults)
      for (const department of deptResults.data) {
        $('#addPersonnelDepartment').append(`<option value='${department.id}'>${department.name}</option>`);
      }
    }
  }
});


$.ajax({
  type: 'GET',
  url: "libs/php/getAllLoc.php",
  data: {},
  dataType: 'json',
  success: function(locResults) {
    // console.log("Location Data:", locResults)
    if (locResults.status.name == "ok") {
    // console.log(locResults)

    for (const location of locResults.data) {
      $('#addDeptLocationName').append(`<option value='${location.id}'>${location.name}</option>`);
      $('#editDeptLocationName').append(`<option value='${location.id}'>${location.name}</option>`);
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
        $("#tableBody").html(""); 
          getAllPersonnel();
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
        console.log(errorThrown);
    }
}) 
});

// ***************************** Delete Personnel Modal************************************
$("#deletePersonnelBtn").on("show.bs.modal", function (e) {
  let id = $(e.relatedTarget).attr("data-id");
  let modal = $('.deletePersonnelBody');
});

$("#deletePersonnel").click(function(){
    // console.log($(this).data('id'));
  // write delete personnel ajax request using $(this).data('id') as the personnel id
          $.ajax({
            type: 'POST',
            url: "libs/php/deletePersonnelByID.php",
            data: {
              id: $(this).data('id'),
            },
            dataType: 'json',
            success: function(results) {
              // console.log(results);
              $("#tableBody").html(""); 
                getAllPersonnel();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
          });
        })



//.........................................Department.......................................
// ************************* Editing Department Form ********************************************
$("#editDepartmentBtn").on("show.bs.modal", function (e) {
  $.ajax({
    url:"libs/php/getDepertmentByID.php",
    type: "POST",
    dataType: "json",
    data: {
      id: $(e.relatedTarget).attr("data-id"),
    },
    success: function (result) {
      // console.log(result);

      let resultCode = result.status.code;
      if (resultCode == 200) {
        $("#editDepartmentId").val(result.data.department[0].id);
        $("#editDepartmentName").val(result.data.department[0].name);
        $("#editDeptLocationName").val(result.data.department[0].locationID);
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
      // console.log(results);
        $("#deptBody").html(""); 
        getAllDepartment();
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
    }
}) 
});


// ***************************** Adding Department Modal************************************
$("#addDepartmentModal").on("show.bs.modal", function (e) {
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
      // console.log(result);
      if (resultCode == 200) {
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#addDepartmentModal .modal-title").replaceWith(
        "Error retrieving data"
      );
    }
  });
});

//***************************** Submit Adding Department  ************************************
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
      $("#deptBody").html(""); 
        getAllDepartment();
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
    }
}) 
});


// ***************************** Delete Department ************************************
$("#deleteDepartment").click(function(){
  // console.log($(this).data('id'));
// write delete personnel ajax request using $(this).data('id') as the personnel id
        $.ajax({
          type: 'POST',
          url: "libs/php/deleteDepartmentByID.php",
          data: {
            id: $(this).data('id'),
          },
          dataType: 'json',
          success: function(results) {
            // console.log(results);
            $("#deptBody").html(""); 
            getAllDepartment();
          },
          error: function(jqXHR, textStatus, errorThrown) {
              console.log(errorThrown);
          }
        });
      })





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
      // console.log(result);

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
      // console.log(results);
      $("#locBody").html(""); 
        getAllLocation();
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
    }
}) 
});

// ***************************** Adding Location Modal************************************
  $.ajax({
    url:"libs/php/getLocationByID.php",
    type: "POST",
    dataType: "json",
    data:{
      name: $("#addNewLocation").val(),
    },
    success: function (result) {
      var resultCode = result.status.code;
      // console.log(result);
      if (resultCode == 200) {
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#addLocationModal .modal-title").replaceWith(
        "Error retrieving data"
      );
    }
  });

//***************************** ADD Location Submit ************************************
$("#addLocationForm").on("submit", function (e) {
  e.preventDefault();
  // AJAX call to save form data

  $.ajax({
    type: 'POST',
    url: "libs/php/remove_duplicate_location.php",
    data: {
    name: $("#addNewLocation").val(),
    },
    dataType: 'json',
    success: function(results1) {
      // console.log(results1)
      if(results1.data.length > 0){
          $('#addLocationModal').modal('hide');
          $('#showLocationMessage').modal('show');
          $('#locationMessage').show();
        // alert('This location has already been added')
      }else{
        $.ajax({
          type: 'POST',
          url: "libs/php/insertLocation.php",
          data: {
            name: $("#addNewLocation").val(),
          },
          dataType: 'json',
          success: function(results) {
            $("#locBody").html(""); 
            getAllLocation();
          },
          error: function(jqXHR, textStatus, errorThrown) {
              console.log(errorThrown);
          }
      }) 
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
    }
}) 
 
});



// ***************************** Delete Location************************************
$("#deleteLocationtBtn").on("show.bs.modal", function (e) {
  let id = $(e.relatedTarget).attr("data-id");

  if ( id <= 0){
    $("#locationBody").show();
} else {
    $("#deleteLocation").hide();
    $("#deleteLocation").attr("locationID", id);
}
});

$("#deleteLocation").click(function(){
    // console.log($(this).data('id'));
  // write delete personnel ajax request using $(this).data('id') as the personnel id
          $.ajax({
            type: 'POST',
            url: "libs/php/deleteLocationByID.php",
            data: {
              id: $(this).data('id'),
            },
            dataType: 'json',
            success: function(results) {
              // console.log(results);
              $("#locBody").html(""); 
              getAllLocation();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
          });
        });