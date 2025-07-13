// Firebase SDK 임포트
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getDatabase, ref, set, get, push, update, remove } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-storage.js";

// 이하 script.html의 나머지 JS 코드 그대로 복사
// ... (생략: 위에서 읽은 script.html의 <script> 태그 내부 전체 코드) ... 

// 로그인/회원가입 모달 제어 함수
window.showAuthModal = function(e) {
  if (e) e.preventDefault();
  document.getElementById('auth-modal').classList.remove('hidden');
  showLoginForm();
};
window.closeAuthModal = function() {
  document.getElementById('auth-modal').classList.add('hidden');
};
window.showLoginForm = function() {
  document.getElementById('auth-modal-title').textContent = '로그인';
  document.getElementById('login-form').classList.remove('hidden');
  document.getElementById('signup-form').classList.add('hidden');
  document.getElementById('login-tab').classList.add('active');
  document.getElementById('signup-tab').classList.remove('active');
};
window.showSignupForm = function() {
  document.getElementById('auth-modal-title').textContent = '회원가입';
  document.getElementById('login-form').classList.add('hidden');
  document.getElementById('signup-form').classList.remove('hidden');
  document.getElementById('login-tab').classList.remove('active');
  document.getElementById('signup-tab').classList.add('active');
};

// 이메일 로그인
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.onsubmit = async function(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.reload();
    } catch (error) {
      alert('로그인 실패: ' + error.message);
    }
  };
}
// 회원가입
const signupForm = document.getElementById('signup-form');
if (signupForm) {
  signupForm.onsubmit = async function(e) {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const nickname = document.getElementById('signup-nickname').value;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // 닉네임 저장 (예: RealtimeDB)
      const userRef = ref(db, `users/${userCredential.user.uid}`);
      await set(userRef, {
        email,
        nickname,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      });
      window.location.reload();
    } catch (error) {
      alert('회원가입 실패: ' + error.message);
    }
  };
}
// 구글 로그인 (기존 signInWithGoogle 함수 활용) 