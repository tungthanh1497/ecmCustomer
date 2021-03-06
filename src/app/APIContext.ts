export class APIContext {
  // host = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/';
  // host = 'https://ecm-api.azurewebsites.net/';
  host = 'https://ecm-api-fptuniversity.azurewebsites.net/';
  centerId = 1;
}

export class APICustomer {
  getAllProgram = 'api/Customer/GetAllProgram';
  getAllCourseFollowProgram = 'api/Customer/GetAllCourseFollowProgram';
  getAllCourse = 'api/Customer/GetAllCourse';
  getAllAdmissionForm = 'api/Customer/GetAllAdmissionForm';
  getCourseById = 'api/Customer/GetCourseById';
  getAdmissionFormById = 'api/Customer/GetAdmissionFormById';
  getProgramById = 'api/Customer/GetProgramById';
  registerCourse = 'api/RegistrationStudent/RegisterCourse';
  getCenterById = 'api/Customer/GetCenterById';
}
