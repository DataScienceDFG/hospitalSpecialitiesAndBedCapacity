d3.csv("hospital_bed.csv").then(function (data) {
    var hospitals = data;
    d3.csv("hospital_speciality.csv").then(function (data2) {
     specialities = data2;
    var button = d3.select('#button');
    var form = d3.select("#form");
    button.on("click", runEnter);
    form.on("submit", runEnter);
    
    function runEnter() {
    d3.select("tbody").html("")
    event.preventDefault();
     
    var inputValue = d3.select("#user-input").property("value");
    var inputCountry = d3.select("#user-country").property("value");
    var filteredHospitals = hospitals.filter(hospital => hospital.hospital_name.toLowerCase().includes(inputValue.toLowerCase()) && hospital.country == inputCountry);
    
    const filteredSpecialities = specialities.filter(
      (speciality) =>
      speciality.hospital_name.toLowerCase().includes(inputValue.toLowerCase()) &&
      speciality.country === inputCountry
     );
     
     
    for (var i = 0; i < filteredHospitals.length; i++) {
     
    d3.select("tbody").insert("tr").html(
     "<td>" + (filteredHospitals[i]['hospital_name']) + "</a>" + "</td>" +
     "<td>" + (filteredHospitals[i]['city']) + "</a>" + "</td>" +
     "<td>" + (filteredHospitals[i]['state']) + "</td>" +
     "<td>" + (filteredHospitals[i]['telephone_number']) + "</td>" +
     "<td>" + (filteredHospitals[i]['email_id']) + "</td>" +
     "<td>" + (filteredHospitals[i]['bed_capacity']) + "</td>" +
     "<td>" + (filteredHospitals[i]['speciality']) + "</td>"+
     "<td>" + (filteredHospitals[i]['country']) + "</td>")
    }
    
    for (let i = 0; i < filteredSpecialities.length; i++) {
      let hospitalNameSp = filteredSpecialities[i]['hospital_name']
      let citySp = filteredSpecialities[i]['city']
      let stateSp = filteredSpecialities[i]['state']
      let telephoneNumberSp = filteredSpecialities[i]['telephone_number']
      let emailIdSp = filteredSpecialities[i]['email_id']
      let bedCapacitySp = filteredSpecialities[i]['bed_capacity']
      let specialitySp = filteredSpecialities[i]['speciality']
      let countrySp = filteredSpecialities[i]['country']
      d3.select("tbody").insert("tr").html(
      "<td>" + (hospitalNameSp) + "</a>" + "</td>" +
      "<td>" + (citySp) + "</a>" + "</td>" +
      "<td>" + (stateSp) + "</a>" + "</td>" +
      "<td>" + (telephoneNumberSp) + "</a>" + "</td>"+
      "<td>" + (emailIdSp) + "</a>" + "</td>"+
      "<td>" + (bedCapacitySp) + "</a>" + "</td>"+
      "<td>" + (specialitySp) + "</a>" + "</td>"+
      "<td>" + (countrySp) + "</a>" + "</td>")
      }
    
     };
     });
     });