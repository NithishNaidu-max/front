import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

// Pages
import Dashboard from './pages/Dashboard';
import VehiclesList from './pages/VehiclesList';
import VehicleDetails from './pages/VehicleDetails';
import AlertsPage from './pages/AlertsPage';
import HistoryPage from './pages/HistoryPage';
import EngineHealth from './pages/EngineHealth';
import SettingsAbout from './pages/SettingsAbout';

import { telemetryApi } from './api/telemetryApi';

export default function App() {
  const [isSimulating, setIsSimulating] = useState(true);
  const [activeAlertCount, setActiveAlertCount] = useState(0);
  const [isBackendConnected, setIsBackendConnected] = useState(true);

  const fetchGlobalState = async () => {
    try {
      const [simStatus, alerts] = await Promise.all([
        telemetryApi.getSimulationStatus(),
        telemetryApi.getAlerts('ACTIVE')
      ]);
      setIsSimulating(simStatus.running);
      setActiveAlertCount(alerts.length);
      setIsBackendConnected(telemetryApi.isBackendHealthy());
    } catch (err) {
      setIsBackendConnected(false);
    }
  };

  useEffect(() => {
    fetchGlobalState();
    const interval = setInterval(fetchGlobalState, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleSimulation = async () => {
    const res = await telemetryApi.toggleSimulation();
    setIsSimulating(res.running);
  };

  const handleTriggerTick = async () => {
    await telemetryApi.triggerTick();
    await fetchGlobalState();
  };

  return (
    <Router>
      <div className="app-container">
        {/* Modern Cockpit Sidebar */}
        <Sidebar 
          activeAlertCount={activeAlertCount} 
          isSimulating={isSimulating} 
        />

        {/* Main Content Area */}
        <div className="main-content">
          <Navbar
            isSimulating={isSimulating}
            onToggleSimulation={handleToggleSimulation}
            onTriggerTick={handleTriggerTick}
            isBackendConnected={isBackendConnected}
          />

          <main>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/vehicles" element={<VehiclesList />} />
              <Route path="/vehicles/:id" element={<VehicleDetails />} />
              <Route path="/alerts" element={<AlertsPage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/engine-health" element={<EngineHealth />} />
              <Route 
                path="/settings" 
                element={
                  <SettingsAbout 
                    isSimulating={isSimulating} 
                    onToggleSimulation={handleToggleSimulation} 
                    onTriggerTick={handleTriggerTick} 
                  />
                } 
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
