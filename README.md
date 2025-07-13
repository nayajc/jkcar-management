# 🚗 JKCar Management - Australia NSW 차량관리 앱

Australia NSW에서 운행하는 회사차량을 효율적으로 관리하는 웹 애플리케이션입니다. Google Apps Script와 Firebase를 활용하여 구축되었습니다.

## ✨ 주요 기능

### 🚗 차량 관리
- 복수의 차량 등록 및 관리
- NSW 차량 등록증 (Rego) 만료일 추적
- 종합보험 만료일 관리
- Green Slip (CTP) 만료일 관리
- 자동 만료 알림 시스템

### 📝 사고 관리
- 사고 발생 시 상세 정보 기록
- 운전자 면허증 사진 업로드
- 상대방 운전자 정보 관리
- 상대방 차량 사진 기록
- 사고 지점 GPS 위치 기록
- 상대방 연락처 관리

### 🔧 정비 관리
- 정비 일정 자동 알림
- 오일 교환, 타이어, 브레이크 패드 등 정비 추적
- 정비소 정보 및 예약 기능
- 정비 이력 관리
- 정비 비용 추적

### 📅 알림 시스템
- 이메일 자동 알림
- 만료일 30일 전 알림
- 정비 일정 알림
- 주간 관리 리포트

## 🛠️ 기술 스택

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Google Apps Script
- **Database**: Firebase Realtime Database
- **Authentication**: Google OAuth, Email/Password
- **Storage**: Firebase Storage (이미지)
- **Styling**: Custom CSS with CSS Variables
- **Responsive**: Mobile-first design

## 📱 반응형 디자인

- 모바일, 태블릿, 데스크톱 완벽 지원
- 터치 친화적 인터페이스
- 세련된 파란색 계통 디자인
- 직관적인 사용자 경험

## 🚀 설치 및 설정

### 1. Google Apps Script 프로젝트 생성

1. [Google Apps Script](https://script.google.com/)에 접속
2. 새 프로젝트 생성
3. 프로젝트 이름을 "JKCar Management"로 설정

### 2. 파일 업로드

각 HTML 파일을 Apps Script 프로젝트에 업로드:
- `Code.gs` - 메인 서버 코드
- `styles.html` - 공통 CSS 스타일
- `script.html` - 공통 JavaScript
- `home.html` - 홈페이지
- `login.html` - 로그인 페이지
- `dashboard.html` - 대시보드
- `vehicles.html` - 차량관리
- `accidents.html` - 사고관리
- `maintenance.html` - 정비관리
- `profile.html` - 프로필

### 3. Firebase 설정

1. [Firebase Console](https://console.firebase.google.com/)에서 새 프로젝트 생성
2. Realtime Database 활성화
3. Authentication 활성화 (Google, Email/Password)
4. Storage 활성화
5. Firebase 설정 정보를 `Code.gs`의 `getFirebaseConfig()` 함수에 입력

#### 현재 Firebase 설정 정보
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyA-BYaIUXgk8szUEuwdmqf8xXdzr8Ss2cs",
  authDomain: "jkcar-management.firebaseapp.com",
  databaseURL: "https://jkcar-management-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "jkcar-management",
  storageBucket: "jkcar-management.firebasestorage.app",
  messagingSenderId: "158717054066",
  appId: "1:158717054066:web:c42faad070cde9911d06eb",
  measurementId: "G-3WRFDYEP1T"
};
```

**Firebase Realtime Database URL**: https://jkcar-management-default-rtdb.asia-southeast1.firebasedatabase.app/

### 4. Google Apps Script 권한 설정

필요한 서비스 활성화:
- Gmail API (알림 이메일 발송)
- Google Drive API (파일 관리)
- Google Maps API (위치 서비스)

### 5. 웹앱 배포

1. Apps Script에서 "배포" > "새 배포" 선택
2. 유형을 "웹앱"으로 설정
3. 액세스 권한 설정
4. 배포 URL 복사

## 📋 사용 방법

### 1. 최초 접속
- Google 계정으로 로그인
- 별명 설정 (Firebase에 저장)
- 앱 사용 시작

### 2. 차량 등록
- 차량 기본 정보 입력
- Rego, 보험, Green Slip 만료일 설정
- 차량 사진 업로드

### 3. 사고 기록
- 사고 발생 시 즉시 기록
- 상대방 정보 입력
- 사고 현장 사진 촬영
- GPS 위치 자동 기록

### 4. 정비 관리
- 정비 일정 설정
- 정비소 정보 등록
- 정비 비용 기록
- 다음 정비 일정 알림

## 🔧 커스터마이징

### 색상 테마 변경
`styles.html`의 CSS 변수 수정:
```css
:root {
  --primary-blue: #2563eb;
  --primary-blue-dark: #1d4ed8;
  --secondary-blue: #1e40af;
  /* 추가 색상 변수들... */
}
```

### 알림 설정
`Code.gs`의 `checkExpiryDates()` 함수에서 알림 조건 수정:
```javascript
if (daysUntilExpiry <= 30 && daysUntilExpiry > 0) {
  // 알림 발송 로직
}
```

### 데이터베이스 스키마
Firebase Realtime Database 구조:
```
/users/{userId}
  - profile: 사용자 정보
  - vehicles: 차량 목록
  - accidents: 사고 기록
  - maintenance: 정비 기록
```

## 📊 데이터 구조

### 차량 정보
```javascript
{
  id: "unique-id",
  plateNumber: "ABC-123",
  make: "Toyota",
  model: "Camry",
  year: 2020,
  color: "White",
  fuelType: "Petrol",
  regoExpiry: "2024-12-31",
  insuranceExpiry: "2024-12-31",
  greenSlipExpiry: "2024-12-31",
  userEmail: "user@example.com",
  createdAt: "2024-01-01T00:00:00Z"
}
```

### 사고 기록
```javascript
{
  id: "unique-id",
  vehiclePlate: "ABC-123",
  accidentDate: "2024-01-01T10:00:00Z",
  accidentType: "접촉사고",
  location: "Sydney, NSW",
  otherDriverName: "John Doe",
  otherDriverPhone: "+61-400-000-000",
  photos: {
    myVehicle: "url",
    otherVehicle: "url",
    accidentScene: "url",
    driverLicense: "url"
  },
  userEmail: "user@example.com",
  createdAt: "2024-01-01T10:30:00Z"
}
```

## 🔒 보안

- Google OAuth 인증
- Firebase Security Rules 설정
- 사용자별 데이터 격리
- HTTPS 통신
- 입력 데이터 검증

## 📈 성능 최적화

- 이미지 압축 및 최적화
- 지연 로딩 (Lazy Loading)
- 캐싱 전략
- 데이터베이스 인덱싱
- CDN 활용

## 🐛 문제 해결

### 일반적인 문제들

1. **Firebase 연결 실패**
   - Firebase 설정 확인
   - API 키 유효성 검사
   - 네트워크 연결 확인

2. **이미지 업로드 실패**
   - Firebase Storage 권한 확인
   - 파일 크기 제한 확인
   - 파일 형식 검증

3. **알림 이메일 발송 실패**
   - Gmail API 권한 확인
   - 발신자 이메일 설정
   - 스팸 필터 확인

## 🤝 기여하기

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 지원

- 이메일: support@jkcar.com
- GitHub Issues: [이슈 등록](https://github.com/your-repo/issues)
- 문서: [Wiki](https://github.com/your-repo/wiki)

## 🙏 감사의 말

- Google Apps Script 팀
- Firebase 팀
- 오픈소스 커뮤니티
- 테스트 사용자들

---

**JKCar Management** - Australia NSW 차량관리의 새로운 표준 🚗✨ 