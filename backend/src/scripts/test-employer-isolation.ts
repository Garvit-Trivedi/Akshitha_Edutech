/**
 * Comprehensive Automated Test Suite: Employer Dashboard & Data Isolation
 * Validates all 7 criteria specified in the prompt.
 */

const API_BASE = 'http://localhost:5000/api/v1';

async function fetchJson(url: string, options: any = {}): Promise<{ status: number; ok: boolean; data: any }> {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };
  const res = await fetch(url, { ...options, headers });
  const data: any = await res.json().catch(() => null);
  return { status: res.status, ok: res.ok, data };
}

let passed = 0;
let failed = 0;

function assert(condition: boolean, testName: string, detail: string = '') {
  if (condition) {
    console.log(`  ✅ PASS: ${testName}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${testName} - ${detail}`);
    failed++;
  }
}

async function runTests() {
  console.log('\n=============================================================');
  console.log('🧪 RUNNING EMPLOYER DASHBOARD & DATA ISOLATION VERIFICATION');
  console.log('=============================================================\n');

  // Step 1: Login Employer 1
  console.log('1️⃣ Authenticating test users...');
  const emp1Login = await fetchJson(`${API_BASE}/auth/login`, {
    method: 'POST',
    body: JSON.stringify({
      email: 'employer@nimbus.example',
      password: 'EmployerSecurePass123!',
    }),
  });
  assert(emp1Login.status === 200 && emp1Login.data.data?.token, 'Employer 1 Login', 'Token received');
  const emp1Token = emp1Login.data.data.token;
  const emp1User = emp1Login.data.data.user;

  // Step 2: Register/Login Employer 2
  const emp2Email = `emp2_test_${Date.now()}@example.com`;
  const emp2Register = await fetchJson(`${API_BASE}/auth/register`, {
    method: 'POST',
    body: JSON.stringify({
      name: 'Stark Industries HR',
      email: emp2Email,
      phone: '9876549999',
      password: 'EmployerPass123!',
      role: 'employer',
      terms: true,
    }),
  });
  assert(emp2Register.status === 201 && emp2Register.data.data?.token, 'Employer 2 Registration', 'Token received');
  const emp2Token = emp2Register.data.data.token;
  const emp2User = emp2Register.data.data.user;

  // Step 3: Login Candidate
  const candLogin = await fetchJson(`${API_BASE}/auth/login`, {
    method: 'POST',
    body: JSON.stringify({
      email: 'candidate@akshithaedutech.example',
      password: 'CandidatePass123!',
    }),
  });
  assert(candLogin.status === 200 && candLogin.data.data?.token, 'Candidate Login', 'Token received');
  const candToken = candLogin.data.data.token;

  // Step 4: Employer 1 Posts Job E1
  console.log('\n2️⃣ Testing Job Creation and Ownership...');
  const jobE1Res = await fetchJson(`${API_BASE}/jobs`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${emp1Token}` },
    body: JSON.stringify({
      company: 'Nimbus Softworks',
      title: `Cloud Architect ${Date.now()}`,
      category: 'Information Technology',
      location: 'Bengaluru',
      type: 'Full-time',
      experience: '4–8 years',
      salary: '₹20 – 35 LPA',
      openings: 2,
      skills: ['AWS', 'Kubernetes', 'Go'],
      description: 'Lead architecture for global scale cloud infrastructure and distributed systems.',
    }),
  });
  assert(jobE1Res.status === 201 && jobE1Res.data.data?.job?._id, 'Employer 1 Creates Job E1');
  const jobE1 = jobE1Res.data.data.job;

  // Step 5: Employer 2 Posts Job E2
  const jobE2Res = await fetchJson(`${API_BASE}/jobs`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${emp2Token}` },
    body: JSON.stringify({
      company: 'Stark Industries',
      title: `Quantum Engineer ${Date.now()}`,
      category: 'Information Technology',
      location: 'Mumbai',
      type: 'Full-time',
      experience: '2–5 years',
      salary: '₹18 – 28 LPA',
      openings: 3,
      skills: ['Quantum', 'Python', 'Physics'],
      description: 'Develop next-generation quantum computing models and secure cryptography.',
    }),
  });
  assert(jobE2Res.status === 201 && jobE2Res.data.data?.job?._id, 'Employer 2 Creates Job E2');
  const jobE2 = jobE2Res.data.data.job;

  // Step 6: Candidate Applies to Job E1
  console.log('\n3️⃣ Candidate Submitting Applications to Both Jobs...');
  const applyE1Res = await fetchJson(`${API_BASE}/jobs/${jobE1._id}/applications`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${candToken}` },
    body: JSON.stringify({
      name: 'Rahul Sharma Candidate',
      email: 'candidate@akshithaedutech.example',
      phone: '9876543222',
      coverNote: 'Extensive AWS and Kubernetes experience ready for Nimbus Softworks.',
    }),
  });
  assert(applyE1Res.status === 201, 'Candidate Successfully Applies to Job E1');
  const appE1 = applyE1Res.data.data?.application;

  // Step 7: Candidate Applies to Job E2
  const applyE2Res = await fetchJson(`${API_BASE}/jobs/${jobE2._id}/applications`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${candToken}` },
    body: JSON.stringify({
      name: 'Rahul Sharma Candidate',
      email: 'candidate@akshithaedutech.example',
      phone: '9876543222',
      coverNote: 'Excited about Stark Industries quantum computing initiatives.',
    }),
  });
  assert(applyE2Res.status === 201, 'Candidate Successfully Applies to Job E2');
  const appE2 = applyE2Res.data.data?.application;

  // Requirement 1: An employer sees only their own jobs.
  console.log('\n4️⃣ Testing Requirement 1: Employer sees ONLY their own jobs...');
  const emp1MyJobs = await fetchJson(`${API_BASE}/employer/jobs`, {
    headers: { Authorization: `Bearer ${emp1Token}` },
  });
  const emp1JobIds = emp1MyJobs.data.data.map((j: any) => j._id);
  assert(
    emp1JobIds.includes(jobE1._id) && !emp1JobIds.includes(jobE2._id),
    'Employer 1 sees Job E1 and DOES NOT see Job E2',
    `Employer 1 has ${emp1MyJobs.data.count} jobs`
  );

  const emp2MyJobs = await fetchJson(`${API_BASE}/employer/jobs`, {
    headers: { Authorization: `Bearer ${emp2Token}` },
  });
  const emp2JobIds = emp2MyJobs.data.data.map((j: any) => j._id);
  assert(
    emp2JobIds.includes(jobE2._id) && !emp2JobIds.includes(jobE1._id),
    'Employer 2 sees Job E2 and DOES NOT see Job E1',
    `Employer 2 has ${emp2MyJobs.data.count} jobs`
  );

  // Requirement 2: An employer sees applicants for their own jobs.
  console.log('\n5️⃣ Testing Requirement 2: Employer sees applicants for own jobs...');
  const emp1AppRes = await fetchJson(`${API_BASE}/employer/jobs/${jobE1._id}/applications`, {
    headers: { Authorization: `Bearer ${emp1Token}` },
  });
  assert(
    emp1AppRes.status === 200 &&
      emp1AppRes.data.count >= 1 &&
      emp1AppRes.data.data.some((a: any) => a._id === appE1._id),
    'Employer 1 views applicants for Job E1',
    `Count: ${emp1AppRes.data.count}`
  );

  const emp2AppRes = await fetchJson(`${API_BASE}/employer/jobs/${jobE2._id}/applications`, {
    headers: { Authorization: `Bearer ${emp2Token}` },
  });
  assert(
    emp2AppRes.status === 200 &&
      emp2AppRes.data.count >= 1 &&
      emp2AppRes.data.data.some((a: any) => a._id === appE2._id),
    'Employer 2 views applicants for Job E2',
    `Count: ${emp2AppRes.data.count}`
  );

  // Requirement 3: Different employers jobs and applicants never get mixed.
  console.log('\n6️⃣ Testing Requirement 3: Different employers NEVER mix data...');
  const crossAccess1 = await fetchJson(`${API_BASE}/employer/jobs/${jobE2._id}/applications`, {
    headers: { Authorization: `Bearer ${emp1Token}` },
  });
  assert(
    crossAccess1.status === 403,
    'Employer 1 forbidden (403) from accessing Employer 2 Job applications',
    `Received status ${crossAccess1.status}`
  );

  const crossAccess2 = await fetchJson(`${API_BASE}/employer/jobs/${jobE1._id}/applications`, {
    headers: { Authorization: `Bearer ${emp2Token}` },
  });
  assert(
    crossAccess2.status === 403,
    'Employer 2 forbidden (403) from accessing Employer 1 Job applications',
    `Received status ${crossAccess2.status}`
  );

  // Requirement 4: Manually changing a job ID or application ID does not bypass authorization.
  console.log('\n7️⃣ Testing Requirement 4: ID tampering cannot bypass authorization...');
  const updateCrossApp = await fetchJson(`${API_BASE}/applications/${appE2._id}/status`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${emp1Token}` },
    body: JSON.stringify({ status: 'shortlisted' }),
  });
  assert(
    updateCrossApp.status === 403,
    'Employer 1 forbidden (403) from modifying Employer 2 application status',
    `Received status ${updateCrossApp.status}`
  );

  const viewCrossApp = await fetchJson(`${API_BASE}/applications/${appE2._id}`, {
    headers: { Authorization: `Bearer ${emp1Token}` },
  });
  assert(
    viewCrossApp.status === 403,
    'Employer 1 forbidden (403) from viewing Employer 2 application record',
    `Received status ${viewCrossApp.status}`
  );

  // Requirement 5: Unauthorized users cannot access employer-only endpoints.
  console.log('\n8️⃣ Testing Requirement 5: Unauthorized users blocked...');
  const unauthJobs = await fetchJson(`${API_BASE}/employer/jobs`);
  assert(unauthJobs.status === 401, 'Unauthenticated user blocked (401) from /employer/jobs');

  const candEmployerJobs = await fetchJson(`${API_BASE}/employer/jobs`, {
    headers: { Authorization: `Bearer ${candToken}` },
  });
  assert(
    candEmployerJobs.status === 403,
    'Candidate (jobseeker) blocked (403) from /employer/jobs',
    `Status ${candEmployerJobs.status}`
  );

  const candJobApps = await fetchJson(`${API_BASE}/employer/jobs/${jobE1._id}/applications`, {
    headers: { Authorization: `Bearer ${candToken}` },
  });
  assert(
    candJobApps.status === 403,
    'Candidate (jobseeker) blocked (403) from /employer/jobs/:id/applications',
    `Status ${candJobApps.status}`
  );

  // Requirement 6: Existing job creation and application submission still work.
  console.log('\n9️⃣ Testing Requirement 6: Normal workflows remain operational...');
  const normalJobList = await fetchJson(`${API_BASE}/jobs?limit=5`);
  assert(
    normalJobList.status === 200 && normalJobList.data.data.length > 0,
    'Public job directory continues functioning smoothly'
  );

  // Requirement 7: Applicant counts match the actual database records.
  console.log('\n🔟 Testing Requirement 7: Accurate Database Applicant Counts...');
  const freshE1Jobs = await fetchJson(`${API_BASE}/employer/jobs`, {
    headers: { Authorization: `Bearer ${emp1Token}` },
  });
  const freshJobE1 = freshE1Jobs.data.data.find((j: any) => j._id === jobE1._id);
  assert(
    freshJobE1 && freshJobE1.applicantsCount === 1,
    'Job E1 applicantsCount accurately reflects 1 application',
    `Actual count: ${freshJobE1?.applicantsCount}`
  );

  const freshE2Jobs = await fetchJson(`${API_BASE}/employer/jobs`, {
    headers: { Authorization: `Bearer ${emp2Token}` },
  });
  const freshJobE2 = freshE2Jobs.data.data.find((j: any) => j._id === jobE2._id);
  assert(
    freshJobE2 && freshJobE2.applicantsCount === 1,
    'Job E2 applicantsCount accurately reflects 1 application',
    `Actual count: ${freshJobE2?.applicantsCount}`
  );

  console.log('\n=============================================================');
  console.log(`📊 TEST RESULTS: ${passed} PASSED | ${failed} FAILED`);
  console.log('=============================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
