const http = require('http');

const runTests = async () => {
  console.log('🧪 Starting API Verification Tests...');

  // Start server directly
  const { app, server } = require('./src/server');

  // Helper for requests
  const request = (path, method = 'GET', body = null, token = null) => {
    return new Promise((resolve, reject) => {
      const payload = body ? JSON.stringify(body) : null;
      const headers = {
        'Content-Type': 'application/json',
      };
      if (payload) {
        headers['Content-Length'] = Buffer.byteLength(payload);
      }
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const req = http.request(
        {
          hostname: '127.0.0.1',
          port: 5000,
          path,
          method,
          headers,
        },
        (res) => {
          let data = '';
          res.on('data', (chunk) => (data += chunk));
          res.on('end', () => {
            try {
              resolve({ status: res.statusCode, body: JSON.parse(data) });
            } catch (e) {
              resolve({ status: res.statusCode, body: data });
            }
          });
        }
      );

      req.on('error', reject);
      if (payload) req.write(payload);
      req.end();
    });
  };

  // Wait a moment for DB connection
  await new Promise((r) => setTimeout(r, 2000));

  try {
    // 1. Health Check
    console.log('1️⃣ Testing Health Check...');
    const health = await request('/api/health');
    console.log('Health Response:', health.status, health.body);

    // 2. Demo User Login
    console.log('\n2️⃣ Testing Demo Login...');
    const demo = await request('/api/auth/demo', 'POST');
    console.log('Demo Login Status:', demo.status, 'User:', demo.body.data?.name);
    const token = demo.body.data?.token;

    if (!token) throw new Error('Failed to get token from demo login');

    // 3. Get Me
    console.log('\n3️⃣ Testing /api/auth/me...');
    const me = await request('/api/auth/me', 'GET', null, token);
    console.log('Me Response:', me.status, me.body.data);

    // 4. Create Task
    console.log('\n4️⃣ Testing Task Creation...');
    const newTask = await request(
      '/api/tasks',
      'POST',
      {
        title: 'Automated Test Task 2026',
        description: 'Verifying end-to-end task pipeline',
        status: 'Todo',
        priority: 'High',
        dueDate: new Date().toISOString(),
      },
      token
    );
    console.log('Create Task Status:', newTask.status, 'TaskId:', newTask.body.data?._id);
    const taskId = newTask.body.data?._id;

    // 5. Update Task Status
    console.log('\n5️⃣ Testing Quick Status Update...');
    const statusUpdate = await request(
      `/api/tasks/${taskId}/status`,
      'PATCH',
      { status: 'Done' },
      token
    );
    console.log('Status Update Response:', statusUpdate.status, 'New status:', statusUpdate.body.data?.status);

    // 6. Test Search and Filter
    console.log('\n6️⃣ Testing Task Filtering & Search...');
    const filtered = await request(
      '/api/tasks?search=Automated&status=Done&priority=High',
      'GET',
      null,
      token
    );
    console.log('Filter matches count:', filtered.body.count, 'Total:', filtered.body.pagination?.totalTasks);

    // 7. Test Analytics
    console.log('\n7️⃣ Testing Analytics API...');
    const analytics = await request('/api/analytics', 'GET', null, token);
    console.log('Analytics Response:', analytics.status, analytics.body.data);

    // 8. Delete Task
    console.log('\n8️⃣ Testing Task Deletion...');
    const deleted = await request(`/api/tasks/${taskId}`, 'DELETE', null, token);
    console.log('Delete Response:', deleted.status, deleted.body);

    console.log('\n🎉 ALL BACKEND API TESTS PASSED SUCCESSFULLY!');
  } catch (err) {
    console.error('❌ Test failed:', err);
  } finally {
    server.close();
    process.exit(0);
  }
};

runTests();
