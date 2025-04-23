export default [
	{
		id: 'a1b2c3d4-1e09-4aa3-9caf-3bd6ffa8e554',
		date: '2024-01-02T10:00:00.000Z',
		status: 200,
		method: 'GET',
		host: 'api.example.com',
		pathname: '/users/123',
		latency: 85,
		region_short: 'US',
		region_full: 'United States',
		timing_phases: {
			DNS: 2,
			Connection: 15,
			TLS: 22,
			TTFB: 31,
			Transfer: 15
		}
	},
	{
		id: 'b2c3d4e5-2f10-5bb4-0db0-4cea00b9f665',
		date: '2024-01-02T10:00:05.123Z',
		status: 404,
		method: 'POST',
		host: 'api.example.com',
		pathname: '/nonexistent',
		latency: 120,
		region_short: 'CA',
		region_full: 'Canada',
		timing_phases: {
			DNS: 3,
			Connection: 18,
			TLS: 25,
			TTFB: 40,
			Transfer: 34
		}
	},
	{
		id: 'c3d4e5f6-3g11-6cc5-1ec1-5dfb11c0g776',
		date: '2024-01-02T10:00:10.456Z',
		status: 500,
		method: 'GET',
		host: 'service.internal',
		pathname: '/database/error',
		latency: 5000,
		region_short: 'UK',
		region_full: 'United Kingdom',
		timing_phases: {
			DNS: 1,
			Connection: 200,
			TLS: 250,
			TTFB: 4500,
			Transfer: 49
		}
	},
	{
		id: 'd4e5f6g7-4h12-7dd6-2fd2-6e0c22d1h887',
		date: '2024-01-02T10:00:15.789Z',
		status: 200,
		method: 'POST',
		host: 'cdn.images.com',
		pathname: '/upload',
		latency: 250,
		region_short: 'DE',
		region_full: 'Germany',
		timing_phases: {
			DNS: 5,
			Connection: 25,
			TLS: 35,
			TTFB: 175,
			Transfer: 10
		}
	},
	{
		id: 'e5f6g7h8-5i13-8ee7-3ge3-7f1d33e2i998',
		date: '2024-01-02T10:00:20.000Z',
		status: 400,
		method: 'GET',
		host: 'auth.service.com',
		pathname: '/login',
		latency: 95,
		region_short: 'JP',
		region_full: 'Japan',
		timing_phases: {
			DNS: 2,
			Connection: 15,
			TLS: 20,
			TTFB: 50,
			Transfer: 8
		}
	},
	{
		id: 'f6g7h8i9-6j14-9ff8-4hf4-8g2e44f3j009',
		date: '2024-01-02T10:00:25.321Z',
		status: 200,
		method: 'GET',
		host: 'api.data.net',
		pathname: '/data/analytics',
		latency: 180,
		region_short: 'AU',
		region_full: 'Australia',
		timing_phases: {
			DNS: 4,
			Connection: 22,
			TLS: 30,
			TTFB: 100,
			Transfer: 24
		}
	},
	{
		id: 'g7h8i9j0-7k15-0aa9-5ig5-9h3f55g4k110',
		date: '2024-01-02T10:00:30.654Z',
		status: 200,
		method: 'POST',
		host: 'service.com',
		pathname: '/resource',
		latency: 70,
		region_short: 'BR',
		region_full: 'Brazil',
		timing_phases: {
			DNS: 1,
			Connection: 10,
			TLS: 12,
			TTFB: 30,
			Transfer: 17
		}
	},
	{
		id: 'h8i9j0k1-8l16-1bb0-6jh6-0i4g66h5l221',
		date: '2024-01-02T10:00:35.987Z',
		status: 404,
		method: 'GET',
		host: 'external.io',
		pathname: '/missing/page',
		latency: 110,
		region_short: 'IN',
		region_full: 'India',
		timing_phases: {
			DNS: 3,
			Connection: 17,
			TLS: 21,
			TTFB: 45,
			Transfer: 24
		}
	},
	{
		id: 'i9j0k1l2-9m17-2cc1-7ki7-1j5h77i6m332',
		date: '2024-01-02T10:00:40.210Z',
		status: 500,
		method: 'POST',
		host: 'internal.backend',
		pathname: '/process',
		latency: 3000,
		region_short: 'RU',
		region_full: 'Russia',
		timing_phases: {
			DNS: 0,
			Connection: 150,
			TLS: 200,
			TTFB: 2600,
			Transfer: 50
		}
	},
	{
		id: 'j0k1l2m3-0n18-3dd2-8lj8-2k6i88j7n443',
		date: '2024-01-02T10:00:45.543Z',
		status: 200,
		method: 'GET',
		host: 'api.v2.com',
		pathname: '/items',
		latency: 65,
		region_short: 'ZA',
		region_full: 'South Africa',
		timing_phases: {
			DNS: 1,
			Connection: 9,
			TLS: 11,
			TTFB: 25,
			Transfer: 19
		}
	},
	{
		id: '1a2b3c4d-5e6f-4aa3-9caf-3bd6ffa8e554',
		date: '2024-01-02T10:00:50.789Z',
		status: 200,
		method: 'POST',
		host: 'www.example.com',
		pathname: '/submit',
		latency: 90,
		region_short: 'US',
		region_full: 'United States',
		timing_phases: {
			DNS: 3,
			Connection: 10,
			TLS: 12,
			TTFB: 50,
			Transfer: 15
		}
	},
	{
		id: '2b3c4d5e-6f70-5bb4-0db0-4cea00b9f665',
		date: '2024-01-02T10:00:55.123Z',
		status: 404,
		method: 'GET',
		host: 'www.test.com',
		pathname: '/notfound',
		latency: 110,
		region_short: 'CA',
		region_full: 'Canada',
		timing_phases: {
			DNS: 2,
			Connection: 12,
			TLS: 15,
			TTFB: 60,
			Transfer: 21
		}
	},
	{
		id: '3c4d5e6f-7g81-6cc5-1ec1-5dfb11c0g776',
		date: '2024-01-02T10:01:00.456Z',
		status: 500,
		method: 'POST',
		host: 'api.internal.net',
		pathname: '/error',
		latency: 2500,
		region_short: 'UK',
		region_full: 'United Kingdom',
		timing_phases: {
			DNS: 0,
			Connection: 100,
			TLS: 150,
			TTFB: 2100,
			Transfer: 150
		}
	},
	{
		id: '4d5e6f7g-8h92-7dd6-2fd2-6e0c22d1h887',
		date: '2024-01-02T10:01:05.789Z',
		status: 200,
		method: 'GET',
		host: 'cdn.static.org',
		pathname: '/image.jpg',
		latency: 180,
		region_short: 'DE',
		region_full: 'Germany',
		timing_phases: {
			DNS: 4,
			Connection: 15,
			TLS: 20,
			TTFB: 120,
			Transfer: 21
		}
	},
	{
		id: '5e6f7g8h-9i03-8ee7-3ge3-7f1d33e2i998',
		date: '2024-01-02T10:01:10.000Z',
		status: 400,
		method: 'POST',
		host: 'auth.server.com',
		pathname: '/auth',
		latency: 80,
		region_short: 'JP',
		region_full: 'Japan',
		timing_phases: {
			DNS: 1,
			Connection: 8,
			TLS: 10,
			TTFB: 40,
			Transfer: 21
		}
	},
	{
		id: '6f7g8h9i-0j14-9ff8-4hf4-8g2e44f3j009',
		date: '2024-01-02T10:01:15.321Z',
		status: 200,
		method: 'GET',
		host: 'data.api.io',
		pathname: '/records',
		latency: 200,
		region_short: 'AU',
		region_full: 'Australia',
		timing_phases: {
			DNS: 5,
			Connection: 20,
			TLS: 25,
			TTFB: 130,
			Transfer: 20
		}
	},
	{
		id: '7g8h9i0j-1k25-0aa9-5ig5-9h3f55g4k110',
		date: '2024-01-02T10:01:20.654Z',
		status: 200,
		method: 'POST',
		host: 'api.resource.org',
		pathname: '/create',
		latency: 75,
		region_short: 'BR',
		region_full: 'Brazil',
		timing_phases: {
			DNS: 2,
			Connection: 12,
			TLS: 15,
			TTFB: 30,
			Transfer: 16
		}
	},
	{
		id: '8h9i0j1k-2l36-1bb0-6jh6-0i4g66h5l221',
		date: '2024-01-02T10:01:25.987Z',
		status: 404,
		method: 'GET',
		host: 'files.external.com',
		pathname: '/missingfile',
		latency: 120,
		region_short: 'IN',
		region_full: 'India',
		timing_phases: {
			DNS: 3,
			Connection: 14,
			TLS: 18,
			TTFB: 55,
			Transfer: 30
		}
	},
	{
		id: '9i0j1k2l-3m47-2cc1-7ki7-1j5h77i6m332',
		date: '2024-01-02T10:01:30.210Z',
		status: 500,
		method: 'POST',
		host: 'internal.service.net',
		pathname: '/processdata',
		latency: 4000,
		region_short: 'RU',
		region_full: 'Russia',
		timing_phases: {
			DNS: 0,
			Connection: 180,
			TLS: 220,
			TTFB: 3500,
			Transfer: 100
		}
	},
	{
		id: '0j1k2l3m-4n58-3dd2-8lj8-2k6i88j7n443',
		date: '2024-01-02T10:01:35.543Z',
		status: 200,
		method: 'GET',
		host: 'api.oldversion.com',
		pathname: '/getlist',
		latency: 70,
		region_short: 'ZA',
		region_full: 'South Africa',
		timing_phases: {
			DNS: 1,
			Connection: 10,
			TLS: 13,
			TTFB: 28,
			Transfer: 18
		}
	},
	{
		id: '1k2l3m4n-5o69-4ee3-9mf9-4al755b9g444',
		date: '2024-01-02T10:01:40.789Z',
		status: 200,
		method: 'POST',
		host: 'www.newsite.com',
		pathname: '/submitinfo',
		latency: 88,
		region_short: 'US',
		region_full: 'United States',
		timing_phases: {
			DNS: 2,
			Connection: 9,
			TLS: 11,
			TTFB: 48,
			Transfer: 18
		}
	},
	{
		id: '2l3m4n5o-6p70-5ff4-0ng0-5bm866c0h555',
		date: '2024-01-02T10:01:45.123Z',
		status: 404,
		method: 'GET',
		host: 'www.oldtest.com',
		pathname: '/errorpage',
		latency: 105,
		region_short: 'CA',
		region_full: 'Canada',
		timing_phases: {
			DNS: 3,
			Connection: 11,
			TLS: 14,
			TTFB: 58,
			Transfer: 19
		}
	},
	{
		id: '3m4n5o6p-7q81-6gg5-1oh1-6cn977d1i666',
		date: '2024-01-02T10:01:50.456Z',
		status: 500,
		method: 'POST',
		host: 'api.db.local',
		pathname: '/faildata',
		latency: 3000,
		region_short: 'UK',
		region_full: 'United Kingdom',
		timing_phases: {
			DNS: 1,
			Connection: 95,
			TLS: 145,
			TTFB: 2500,
			Transfer: 259
		}
	},
	{
		id: '4n5o6p7q-8r92-7hh6-2pi2-7do088e2j777',
		date: '2024-01-02T10:01:55.789Z',
		status: 200,
		method: 'GET',
		host: 'cdn.imagesrv.org',
		pathname: '/preview.png',
		latency: 175,
		region_short: 'DE',
		region_full: 'Germany',
		timing_phases: {
			DNS: 3,
			Connection: 14,
			TLS: 19,
			TTFB: 115,
			Transfer: 24
		}
	},
	{
		id: '5o6p7q8r-9s03-8ii7-3qj3-8ep199f3k888',
		date: '2024-01-02T10:02:00.000Z',
		status: 400,
		method: 'POST',
		host: 'auth.sso.site',
		pathname: '/access',
		latency: 78,
		region_short: 'JP',
		region_full: 'Japan',
		timing_phases: {
			DNS: 0,
			Connection: 7,
			TLS: 9,
			TTFB: 38,
			Transfer: 24
		}
	},
	{
		id: '6p7q8r9s-0t14-9jj8-4rk4-9fq200g4l999',
		date: '2024-01-02T10:02:05.321Z',
		status: 200,
		method: 'GET',
		host: 'data.v1.io',
		pathname: '/statsinfo',
		latency: 195,
		region_short: 'AU',
		region_full: 'Australia',
		timing_phases: {
			DNS: 4,
			Connection: 19,
			TLS: 24,
			TTFB: 125,
			Transfer: 23
		}
	},
	{
		id: '7q8r9s0t-1u25-0kk9-5sl5-0gr311h5m000',
		date: '2024-01-02T10:02:10.654Z',
		status: 200,
		method: 'POST',
		host: 'api.rescenter.org',
		pathname: '/doaction',
		latency: 72,
		region_short: 'BR',
		region_full: 'Brazil',
		timing_phases: {
			DNS: 1,
			Connection: 11,
			TLS: 14,
			TTFB: 29,
			Transfer: 17
		}
	},
	{
		id: '8r9s0t1u-2v36-1ll0-6tm6-1hs422i6n111',
		date: '2024-01-02T10:02:15.987Z',
		status: 404,
		method: 'GET',
		host: 'files.oldstore.com',
		pathname: '/missingdata',
		latency: 115,
		region_short: 'IN',
		region_full: 'India',
		timing_phases: {
			DNS: 2,
			Connection: 13,
			TLS: 17,
			TTFB: 50,
			Transfer: 33
		}
	},
	{
		id: '9s0t1u2v-3w47-2mm1-7un7-2it533j7o222',
		date: '2024-01-02T10:02:20.210Z',
		status: 500,
		method: 'POST',
		host: 'internal.datafarm.net',
		pathname: '/calcfail',
		latency: 3500,
		region_short: 'RU',
		region_full: 'Russia',
		timing_phases: {
			DNS: 1,
			Connection: 170,
			TLS: 210,
			TTFB: 3000,
			Transfer: 119
		}
	},
	{
		id: '0t1u2v3w-4x58-3nn2-8vo8-3ju644k8p333',
		date: '2024-01-02T10:02:25.543Z',
		status: 200,
		method: 'GET',
		host: 'api.v2data.org',
		pathname: '/getinfo',
		latency: 68,
		region_short: 'ZA',
		region_full: 'South Africa',
		timing_phases: {
			DNS: 0,
			Connection: 8,
			TLS: 10,
			TTFB: 26,
			Transfer: 24
		}
	}
]
