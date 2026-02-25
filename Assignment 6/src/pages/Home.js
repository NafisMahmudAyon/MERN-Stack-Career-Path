import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
	const { currentUser, logout } = useAuth();
	const navigate = useNavigate();
	const [loggingOut, setLoggingOut] = useState(false);

	const handleLogout = async () => {
		try {
			setLoggingOut(true);
			await logout();
			navigate("/login");
		} catch (err) {
			console.error("Logout failed:", err);
			setLoggingOut(false);
		}
	};

	const getInitials = (name, email) => {
		if (name) {
			return name
				.split(" ")
				.map((n) => n[0])
				.join("")
				.toUpperCase()
				.slice(0, 2);
		}
		return email ? email[0].toUpperCase() : "?";
	};

	const displayName =
		currentUser?.displayName || currentUser?.email?.split("@")[0] || "User";

	return (
		<div className="home-page">
			<div className="home-bg-pattern" />

			<header className="home-header">
				<div className="header-brand">⬡ AuthNexus</div>
				<button
					className="btn-logout"
					onClick={handleLogout}
					disabled={loggingOut}>
					{loggingOut ? <span className="spinner dark" /> : "Sign Out"}
				</button>
			</header>

			<main className="home-main">
				<div className="welcome-card">
					<div className="avatar">
						{currentUser?.photoURL ? (
							<img src={currentUser.photoURL} alt="Profile" />
						) : (
							<span>
								{getInitials(currentUser?.displayName, currentUser?.email)}
							</span>
						)}
						<div className="online-dot" />
					</div>

					<div className="welcome-text">
						<div className="welcome-tag">Authenticated ✓</div>
						<h1>Hello, {displayName}!</h1>
						<p>You're securely logged in to your account.</p>
					</div>

					<div className="info-grid">
						<InfoCard
							icon="✉"
							label="Email"
							value={currentUser?.email || "N/A"}
						/>
						<InfoCard
							icon="🪪"
							label="User ID"
							value={
								currentUser?.uid ? `${currentUser.uid.slice(0, 16)}...` : "N/A"
							}
						/>
						<InfoCard
							icon="🔐"
							label="Provider"
							value={currentUser?.providerData?.[0]?.providerId || "email"}
						/>
						<InfoCard
							icon="📅"
							label="Joined"
							value={
								currentUser?.metadata?.creationTime
									? new Date(
											currentUser.metadata.creationTime,
										).toLocaleDateString("en-US", {
											month: "short",
											day: "numeric",
											year: "numeric",
										})
									: "N/A"
							}
						/>
					</div>
				</div>

				<div className="features-section">
					<h2>What's protected here</h2>
					<div className="features-grid">
						<FeatureCard
							icon="🔒"
							title="Protected Route"
							desc="This page is only accessible when authenticated. Visitors are redirected to login."
						/>
						<FeatureCard
							icon="🔄"
							title="Session Persistence"
							desc="Refresh the page — you'll still be logged in. Firebase handles state automatically."
						/>
						<FeatureCard
							icon="⚡"
							title="Fast Auth"
							desc="Login response under 2 seconds using Firebase's optimized OAuth infrastructure."
						/>
					</div>
				</div>
			</main>
		</div>
	);
};

const InfoCard = ({ icon, label, value }) => (
	<div className="info-card">
		<div className="info-icon">{icon}</div>
		<div className="info-content">
			<div className="info-label">{label}</div>
			<div className="info-value">{value}</div>
		</div>
	</div>
);

const FeatureCard = ({ icon, title, desc }) => (
	<div className="feature-card">
		<div className="feature-icon">{icon}</div>
		<h3>{title}</h3>
		<p>{desc}</p>
	</div>
);

export default Home;

