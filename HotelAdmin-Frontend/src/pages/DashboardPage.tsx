import React from 'react';

const DashboardPage: React.FC = () => {
  return (
    <>
      <div className="page-header">
        <div>
          <div className="page-title">Good Morning, Arjun ✦</div>
          <div className="page-sub">Friday, 27 March 2026 · Kathmandu</div>
        </div>
        <div className="header-right">
          <div className="btn-notif">🔔</div>
          <button className="btn-primary">+ New Booking</button>
        </div>
      </div>
      <div className="stats-grid">
        <div className="stat-card c1">
          <div className="stat-label">Total Revenue</div>
          <div className="stat-value">
            Rs. 1,25,018 <small>/ month</small>
          </div>
          <div className="badge up">↑ 12.4% vs last month</div>
        </div>
        <div className="stat-card c2">
          <div className="stat-label">Rooms Occupied</div>
          <div className="stat-value">
            37 <small>/ 50</small>
          </div>
          <div className="badge up">↑ 74% occupancy</div>
        </div>
        <div className="stat-card c3">
          <div className="stat-label">Today's Check-ins</div>
          <div className="stat-value">8</div>
          <div className="badge ne">→ 3 pending arrival</div>
        </div>
        <div className="stat-card c4">
          <div className="stat-label">Pending Complaints</div>
          <div className="stat-value">3</div>
          <div className="badge dn">↑ 1 new today</div>
        </div>
      </div>
      <div className="mid-row">
        <div className="mini-m">
          <div className="m-icon mi1">🍽</div>
          <div>
            <div className="m-val">Rs. 18,400</div>
            <div className="m-lbl">Restaurant Revenue Today</div>
          </div>
        </div>
        <div className="mini-m">
          <div className="m-icon mi2">⭐</div>
          <div>
            <div className="m-val">4.7 / 5</div>
            <div className="m-lbl">Average Guest Rating</div>
          </div>
        </div>
        <div className="mini-m">
          <div className="m-icon mi3">🛎</div>
          <div>
            <div className="m-val">12</div>
            <div className="m-lbl">Service Requests Open</div>
          </div>
        </div>
      </div>
      <div className="two-col">
        <div className="panel">
          <div className="panel-header">
            <div className="panel-title">Room Overview</div>
            <select className="select-mini">
              <option>All Floors</option>
              <option>Floor 1</option>
              <option>Floor 2</option>
              <option>Floor 3</option>
            </select>
          </div>
          <table className="tbl">
            <thead>
              <tr>
                <th>Room</th>
                <th>Type</th>
                <th>Guest</th>
                <th>Check-out</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontFamily: "'Playfair Display',serif", color: 'var(--gold2)' }}>
                  101
                </td>
                <td>Deluxe</td>
                <td>Priya Sharma</td>
                <td>Mar 29</td>
                <td>
                  <span className="pill p-occ">Occupied</span>
                </td>
              </tr>
              <tr>
                <td style={{ fontFamily: "'Playfair Display',serif", color: 'var(--gold2)' }}>
                  204
                </td>
                <td>Suite</td>
                <td>—</td>
                <td>—</td>
                <td>
                  <span className="pill p-avl">Available</span>
                </td>
              </tr>
              <tr>
                <td style={{ fontFamily: "'Playfair Display',serif", color: 'var(--gold2)' }}>
                  305
                </td>
                <td>Standard</td>
                <td>Rajan Thapa</td>
                <td>Today</td>
                <td>
                  <span className="pill p-out">Checkout</span>
                </td>
              </tr>
              <tr>
                <td style={{ fontFamily: "'Playfair Display',serif", color: 'var(--gold2)' }}>
                  112
                </td>
                <td>Deluxe</td>
                <td>—</td>
                <td>—</td>
                <td>
                  <span className="pill p-mnt">Maintenance</span>
                </td>
              </tr>
              <tr>
                <td style={{ fontFamily: "'Playfair Display',serif", color: 'var(--gold2)' }}>
                  208
                </td>
                <td>Standard</td>
                <td>Aisha Gurung</td>
                <td>Mar 30</td>
                <td>
                  <span className="pill p-occ">Occupied</span>
                </td>
              </tr>
              <tr>
                <td style={{ fontFamily: "'Playfair Display',serif", color: 'var(--gold2)' }}>
                  310
                </td>
                <td>Suite</td>
                <td>David Lee</td>
                <td>Apr 1</td>
                <td>
                  <span className="pill p-occ">Occupied</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="right-col">
          <div className="panel">
            <div className="panel-header">
              <div className="panel-title">Occupancy</div>
              <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Tonight</span>
            </div>
            <div className="donut-wrap">
              <svg
                className="donut"
                width="120"
                height="120"
                viewBox="0 0 120 120"
              >
                <circle className="trk" cx="60" cy="60" r="50" />
                <circle className="fll" cx="60" cy="60" r="50" />
              </svg>
              <div className="donut-ctr">
                <div className="donut-pct">74%</div>
                <div className="donut-lbl2">FILLED</div>
              </div>
            </div>
            <div className="legend">
              <div className="leg-i">
                <div className="leg-d" style={{ background: 'var(--gold)' }}></div>
                Occupied 37
              </div>
              <div className="leg-i">
                <div className="leg-d" style={{ background: 'var(--border)' }}></div>
                Free 13
              </div>
            </div>
          </div>
          <div className="panel">
            <div className="panel-header">
              <div className="panel-title">Today's Check-ins</div>
              <span style={{ fontSize: '11px', color: 'var(--muted)' }}>8 total</span>
            </div>
            <div className="cin-list">
              <div className="cin-row">
                <div className="g-av">PS</div>
                <div>
                  <div className="g-nm">Priya Sharma</div>
                  <div className="g-rm">Room 101 · Deluxe</div>
                </div>
                <div className="c-tm">Arrived</div>
              </div>
              <div className="cin-row">
                <div className="g-av">DL</div>
                <div>
                  <div className="g-nm">David Lee</div>
                  <div className="g-rm">Room 310 · Suite</div>
                </div>
                <div className="c-tm">2:30 PM</div>
              </div>
              <div className="cin-row">
                <div className="g-av">MK</div>
                <div>
                  <div className="g-nm">Maya Karki</div>
                  <div className="g-rm">Room 217 · Standard</div>
                </div>
                <div className="c-tm">4:00 PM</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
