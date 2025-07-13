// 차량관리 앱 메인 서버
function doGet(e) {
  const page = e.parameter.page || 'home';
  
  switch(page) {
    case 'login':
      return HtmlService.createTemplateFromFile('login').evaluate()
        .setTitle('JKCar Management - 로그인')
        .addMetaTag('viewport', 'width=device-width, initial-scale=1')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    
    case 'dashboard':
      return HtmlService.createTemplateFromFile('dashboard').evaluate()
        .setTitle('JKCar Management - 대시보드')
        .addMetaTag('viewport', 'width=device-width, initial-scale=1')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    
    case 'vehicles':
      return HtmlService.createTemplateFromFile('vehicles').evaluate()
        .setTitle('JKCar Management - 차량관리')
        .addMetaTag('viewport', 'width=device-width, initial-scale=1')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    
    case 'accidents':
      return HtmlService.createTemplateFromFile('accidents').evaluate()
        .setTitle('JKCar Management - 사고관리')
        .addMetaTag('viewport', 'width=device-width, initial-scale=1')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    
    case 'maintenance':
      return HtmlService.createTemplateFromFile('maintenance').evaluate()
        .setTitle('JKCar Management - 정비관리')
        .addMetaTag('viewport', 'width=device-width, initial-scale=1')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    
    case 'profile':
      return HtmlService.createTemplateFromFile('profile').evaluate()
        .setTitle('JKCar Management - 프로필')
        .addMetaTag('viewport', 'width=device-width, initial-scale=1')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    
    default:
      return HtmlService.createTemplateFromFile('home').evaluate()
        .setTitle('JKCar Management - 홈')
        .addMetaTag('viewport', 'width=device-width, initial-scale=1')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }
}

// HTML 파일 include 함수
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// Firebase 설정
function getFirebaseConfig() {
  return {
    apiKey: "AIzaSyA-BYaIUXgk8szUEuwdmqf8xXdzr8Ss2cs",
    authDomain: "jkcar-management.firebaseapp.com",
    databaseURL: "https://jkcar-management-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "jkcar-management",
    storageBucket: "jkcar-management.firebasestorage.app",
    messagingSenderId: "158717054066",
    appId: "1:158717054066:web:c42faad070cde9911d06eb",
    measurementId: "G-3WRFDYEP1T"
  };
}

// Firebase Admin SDK 초기화 (실제 구현시 Firebase Admin SDK 사용)
function initializeFirebaseAdmin() {
  // Firebase Admin SDK 설정
  // 실제 구현시 Firebase Admin SDK를 사용하여 서버 사이드에서 Firebase에 직접 접근
  return true;
}

// 사용자 정보 저장
function saveUserProfile(nickname) {
  const user = Session.getActiveUser();
  const userEmail = user.getEmail();
  
  const userData = {
    email: userEmail,
    nickname: nickname,
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString()
  };
  
  // Firebase Realtime Database에 저장
  const firebaseUrl = "https://jkcar-management-default-rtdb.asia-southeast1.firebasedatabase.app";
  const userPath = `/users/${userEmail.replace(/[.#$[\]]/g, '_')}`;
  
  try {
    const response = UrlFetchApp.fetch(`${firebaseUrl}${userPath}.json`, {
      method: 'PUT',
      payload: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (response.getResponseCode() === 200) {
      return { success: true, message: '프로필이 저장되었습니다! 🎉' };
    } else {
      return { success: false, message: '저장에 실패했습니다.' };
    }
  } catch (error) {
    console.error('Firebase 저장 오류:', error);
    return { success: false, message: '저장 중 오류가 발생했습니다.' };
  }
}

// 차량 정보 저장
function saveVehicle(vehicleData) {
  const user = Session.getActiveUser();
  const userEmail = user.getEmail();
  
  vehicleData.userEmail = userEmail;
  vehicleData.createdAt = new Date().toISOString();
  vehicleData.id = Utilities.getUuid();
  
  // Firebase Realtime Database에 저장
  const firebaseUrl = "https://jkcar-management-default-rtdb.asia-southeast1.firebasedatabase.app";
  const vehiclesPath = `/vehicles/${userEmail.replace(/[.#$[\]]/g, '_')}/${vehicleData.id}`;
  
  try {
    const response = UrlFetchApp.fetch(`${firebaseUrl}${vehiclesPath}.json`, {
      method: 'PUT',
      payload: JSON.stringify(vehicleData),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (response.getResponseCode() === 200) {
      return { success: true, message: '차량이 등록되었습니다! 🚗' };
    } else {
      return { success: false, message: '저장에 실패했습니다.' };
    }
  } catch (error) {
    console.error('Firebase 저장 오류:', error);
    return { success: false, message: '저장 중 오류가 발생했습니다.' };
  }
}

// 차량 목록 조회
function getVehicles() {
  const user = Session.getActiveUser();
  const userEmail = user.getEmail();
  
  // Firebase Realtime Database에서 차량 목록 조회
  const firebaseUrl = "https://jkcar-management-default-rtdb.asia-southeast1.firebasedatabase.app";
  const vehiclesPath = `/vehicles/${userEmail.replace(/[.#$[\]]/g, '_')}`;
  
  try {
    const response = UrlFetchApp.fetch(`${firebaseUrl}${vehiclesPath}.json`);
    
    if (response.getResponseCode() === 200) {
      const data = JSON.parse(response.getContentText());
      if (data) {
        // Firebase에서 가져온 데이터를 배열로 변환
        return Object.values(data);
      }
    }
    return [];
  } catch (error) {
    console.error('Firebase 조회 오류:', error);
    return [];
  }
}

// 사고 기록 저장
function saveAccident(accidentData) {
  const user = Session.getActiveUser();
  const userEmail = user.getEmail();
  
  accidentData.userEmail = userEmail;
  accidentData.createdAt = new Date().toISOString();
  accidentData.id = Utilities.getUuid();
  
  // Firebase Realtime Database에 저장
  const firebaseUrl = "https://jkcar-management-default-rtdb.asia-southeast1.firebasedatabase.app";
  const accidentsPath = `/accidents/${userEmail.replace(/[.#$[\]]/g, '_')}/${accidentData.id}`;
  
  try {
    const response = UrlFetchApp.fetch(`${firebaseUrl}${accidentsPath}.json`, {
      method: 'PUT',
      payload: JSON.stringify(accidentData),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (response.getResponseCode() === 200) {
      return { success: true, message: '사고 기록이 저장되었습니다! 📝' };
    } else {
      return { success: false, message: '저장에 실패했습니다.' };
    }
  } catch (error) {
    console.error('Firebase 저장 오류:', error);
    return { success: false, message: '저장 중 오류가 발생했습니다.' };
  }
}

// 정비 기록 저장
function saveMaintenance(maintenanceData) {
  const user = Session.getActiveUser();
  const userEmail = user.getEmail();
  
  maintenanceData.userEmail = userEmail;
  maintenanceData.createdAt = new Date().toISOString();
  maintenanceData.id = Utilities.getUuid();
  
  // Firebase Realtime Database에 저장
  const firebaseUrl = "https://jkcar-management-default-rtdb.asia-southeast1.firebasedatabase.app";
  const maintenancePath = `/maintenance/${userEmail.replace(/[.#$[\]]/g, '_')}/${maintenanceData.id}`;
  
  try {
    const response = UrlFetchApp.fetch(`${firebaseUrl}${maintenancePath}.json`, {
      method: 'PUT',
      payload: JSON.stringify(maintenanceData),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (response.getResponseCode() === 200) {
      return { success: true, message: '정비 기록이 저장되었습니다! 🔧' };
    } else {
      return { success: false, message: '저장에 실패했습니다.' };
    }
  } catch (error) {
    console.error('Firebase 저장 오류:', error);
    return { success: false, message: '저장 중 오류가 발생했습니다.' };
  }
}

// 알림 이메일 발송
function sendNotificationEmail(recipient, subject, message) {
  try {
    GmailApp.sendEmail(recipient, subject, message);
    return { success: true, message: '알림 이메일이 발송되었습니다! 📧' };
  } catch (error) {
    return { success: false, message: '이메일 발송에 실패했습니다: ' + error.toString() };
  }
}

// Firebase에서 사용자 프로필 조회
function getUserProfile() {
  const user = Session.getActiveUser();
  const userEmail = user.getEmail();
  
  const firebaseUrl = "https://jkcar-management-default-rtdb.asia-southeast1.firebasedatabase.app";
  const userPath = `/users/${userEmail.replace(/[.#$[\]]/g, '_')}`;
  
  try {
    const response = UrlFetchApp.fetch(`${firebaseUrl}${userPath}.json`);
    
    if (response.getResponseCode() === 200) {
      const data = JSON.parse(response.getContentText());
      return data;
    }
    return null;
  } catch (error) {
    console.error('Firebase 프로필 조회 오류:', error);
    return null;
  }
}

// Firebase에서 사고 목록 조회
function getAccidents() {
  const user = Session.getActiveUser();
  const userEmail = user.getEmail();
  
  const firebaseUrl = "https://jkcar-management-default-rtdb.asia-southeast1.firebasedatabase.app";
  const accidentsPath = `/accidents/${userEmail.replace(/[.#$[\]]/g, '_')}`;
  
  try {
    const response = UrlFetchApp.fetch(`${firebaseUrl}${accidentsPath}.json`);
    
    if (response.getResponseCode() === 200) {
      const data = JSON.parse(response.getContentText());
      if (data) {
        return Object.values(data);
      }
    }
    return [];
  } catch (error) {
    console.error('Firebase 사고 조회 오류:', error);
    return [];
  }
}

// Firebase에서 정비 목록 조회
function getMaintenance() {
  const user = Session.getActiveUser();
  const userEmail = user.getEmail();
  
  const firebaseUrl = "https://jkcar-management-default-rtdb.asia-southeast1.firebasedatabase.app";
  const maintenancePath = `/maintenance/${userEmail.replace(/[.#$[\]]/g, '_')}`;
  
  try {
    const response = UrlFetchApp.fetch(`${firebaseUrl}${maintenancePath}.json`);
    
    if (response.getResponseCode() === 200) {
      const data = JSON.parse(response.getContentText());
      if (data) {
        return Object.values(data);
      }
    }
    return [];
  } catch (error) {
    console.error('Firebase 정비 조회 오류:', error);
    return [];
  }
}

// 차량 정보 업데이트
function updateVehicle(vehicleId, vehicleData) {
  const user = Session.getActiveUser();
  const userEmail = user.getEmail();
  
  vehicleData.updatedAt = new Date().toISOString();
  
  const firebaseUrl = "https://jkcar-management-default-rtdb.asia-southeast1.firebasedatabase.app";
  const vehiclePath = `/vehicles/${userEmail.replace(/[.#$[\]]/g, '_')}/${vehicleId}`;
  
  try {
    const response = UrlFetchApp.fetch(`${firebaseUrl}${vehiclePath}.json`, {
      method: 'PATCH',
      payload: JSON.stringify(vehicleData),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (response.getResponseCode() === 200) {
      return { success: true, message: '차량 정보가 수정되었습니다! ✅' };
    } else {
      return { success: false, message: '수정에 실패했습니다.' };
    }
  } catch (error) {
    console.error('Firebase 업데이트 오류:', error);
    return { success: false, message: '수정 중 오류가 발생했습니다.' };
  }
}

// 차량 삭제
function deleteVehicle(vehicleId) {
  const user = Session.getActiveUser();
  const userEmail = user.getEmail();
  
  const firebaseUrl = "https://jkcar-management-default-rtdb.asia-southeast1.firebasedatabase.app";
  const vehiclePath = `/vehicles/${userEmail.replace(/[.#$[\]]/g, '_')}/${vehicleId}`;
  
  try {
    const response = UrlFetchApp.fetch(`${firebaseUrl}${vehiclePath}.json`, {
      method: 'DELETE'
    });
    
    if (response.getResponseCode() === 200) {
      return { success: true, message: '차량이 삭제되었습니다.' };
    } else {
      return { success: false, message: '삭제에 실패했습니다.' };
    }
  } catch (error) {
    console.error('Firebase 삭제 오류:', error);
    return { success: false, message: '삭제 중 오류가 발생했습니다.' };
  }
}

// 만료일 체크 및 알림
function checkExpiryDates() {
  const vehicles = getVehicles();
  const user = Session.getActiveUser();
  const userEmail = user.getEmail();
  const today = new Date();
  
  vehicles.forEach(vehicle => {
    // Rego 만료일 체크
    if (vehicle.regoExpiry) {
      const regoDate = new Date(vehicle.regoExpiry);
      const daysUntilExpiry = Math.ceil((regoDate - today) / (1000 * 60 * 60 * 24));
      
      if (daysUntilExpiry <= 30 && daysUntilExpiry > 0) {
        sendNotificationEmail(
          userEmail,
          `🚨 ${vehicle.plateNumber} Rego 만료 알림`,
          `${vehicle.plateNumber}의 Rego가 ${daysUntilExpiry}일 후에 만료됩니다.`
        );
      }
    }
    
    // 보험 만료일 체크
    if (vehicle.insuranceExpiry) {
      const insuranceDate = new Date(vehicle.insuranceExpiry);
      const daysUntilExpiry = Math.ceil((insuranceDate - today) / (1000 * 60 * 60 * 24));
      
      if (daysUntilExpiry <= 30 && daysUntilExpiry > 0) {
        sendNotificationEmail(
          userEmail,
          `🚨 ${vehicle.plateNumber} 보험 만료 알림`,
          `${vehicle.plateNumber}의 보험이 ${daysUntilExpiry}일 후에 만료됩니다.`
        );
      }
    }
    
    // Green Slip 만료일 체크
    if (vehicle.greenSlipExpiry) {
      const greenSlipDate = new Date(vehicle.greenSlipExpiry);
      const daysUntilExpiry = Math.ceil((greenSlipDate - today) / (1000 * 60 * 60 * 24));
      
      if (daysUntilExpiry <= 30 && daysUntilExpiry > 0) {
        sendNotificationEmail(
          userEmail,
          `🚨 ${vehicle.plateNumber} Green Slip 만료 알림`,
          `${vehicle.plateNumber}의 Green Slip이 ${daysUntilExpiry}일 후에 만료됩니다.`
        );
      }
    }
  });
} 