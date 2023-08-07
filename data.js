d3.csv("hospital_bed.csv").then(function (data) {
  var hospitals = data;
  d3.csv("hospital_speciality.csv").then(function (data2) {
      specialities = data2;
      var button = d3.select('#button');
      var form = d3.select("#form");
      button.on("click", runEnter);
      form.on("submit", runEnter);

      function runEnter() {
          d3.select("tbody").html("");
          event.preventDefault();

          var inputValue = d3.select("#user-input").node().value.trim();
          var inputCountry = d3.select("#user-country").property("value");

          if (inputValue === "") {
              alert("Please enter Hospital name.");
              return;
          }

          var filteredHospitals = hospitals.filter(hospital =>
              hospital.hospital_name.toLowerCase().includes(inputValue.toLowerCase()) &&
              hospital.country == inputCountry
          );

          const filteredSpecialities = specialities.filter(
              speciality =>
                  speciality.hospital_name.toLowerCase().includes(inputValue.toLowerCase()) &&
                  speciality.country === inputCountry
          );

          var mergedResults = [...filteredHospitals, ...filteredSpecialities];

          if (mergedResults.length === 0) {
              d3.select("tbody").append("tr").html("<td colspan='8' class='no-data'>No data available</td>");
              return;
          }

          for (var i = 0; i < mergedResults.length; i++) {
              d3.select("tbody").insert("tr").html(
                  "<td>" + (mergedResults[i]['hospital_name']) + "</td>" +
                  "<td>" + (mergedResults[i]['city']) + "</td>" +
                  "<td>" + (mergedResults[i]['state']) + "</td>" +
                  "<td>" + (mergedResults[i]['telephone_number']) + "</td>" +
                  "<td>" + (mergedResults[i]['email_id']) + "</td>" +
                  "<td>" + (mergedResults[i]['bed_capacity']) + "</td>" +
                  "<td>" + (mergedResults[i]['speciality']) + "</td>" +
                  "<td>" + (mergedResults[i]['country']) + "</td>"
              );
          }
      };
  });
});
