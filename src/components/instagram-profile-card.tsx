import Image from 'next/image';
import { instagramProfileData, type InstagramProfileData } from '@/data/instagram-profile';

interface InstagramProfileCardProps {
  variant?: 'full' | 'aside';
  className?: string;
  data?: InstagramProfileData;
}

export function InstagramProfileCard({
  variant = 'full',
  className = '',
  data = instagramProfileData,
}: InstagramProfileCardProps) {
  const isAside = variant === 'aside';

  return (
    <section
      className={`ig-profile-card ${isAside ? 'ig-profile-card-aside' : 'ig-profile-card-full'} ${className}`}
      aria-label="Profil Instagram Resmi Pusat Mesin Laundry Kalbar"
    >
      <div className="ig-card-header">
        {/* Avatar with dynamic Story Gradient Ring */}
        <a
          href={data.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ig-avatar-link"
          aria-label={`Buka profil Instagram ${data.handle}`}
        >
          <div className="ig-avatar-ring">
            <div className="ig-avatar-inner">
              <Image
                src={data.avatarUrl}
                alt={data.name}
                width={isAside ? 56 : 76}
                height={isAside ? 56 : 76}
                className="ig-avatar-img"
                priority={!isAside}
              />
            </div>
          </div>
        </a>

        {/* User Identity */}
        <div className="ig-identity-block">
          <div className="ig-handle-row">
            <a
              href={data.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ig-handle"
            >
              <span>{data.handle}</span>
              {data.verified && (
                <svg
                  className="ig-verified-badge"
                  viewBox="0 0 40 40"
                  fill="none"
                  aria-label="Akun terverifikasi"
                  role="img"
                >
                  <circle cx="20" cy="20" r="18" fill="#0095F6" />
                  <path
                    d="M12 20.5L17.5 26L28 15"
                    stroke="#ffffff"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </a>
          </div>

          <h3 className="ig-display-name">{data.name}</h3>
          <span className="ig-category-pill">{data.category}</span>
        </div>
      </div>

      {/* Followers, Following, Posts Count - Full width 3-column strip */}
      <div className="ig-stats-row">
        <div className="ig-stat">
          <strong>{data.postsCount}</strong>
          <span>kiriman</span>
        </div>
        <div className="ig-stat">
          <strong>{new Intl.NumberFormat('id-ID').format(data.followersCount)}</strong>
          <span>pengikut</span>
        </div>
        <div className="ig-stat">
          <strong>{data.followingCount}</strong>
          <span>diikuti</span>
        </div>
      </div>

      {/* Bio & Value Proposition */}
      <div className="ig-bio-block">
        <ul className="ig-bio-list">
          {data.bioLines.map((line, idx) => (
            <li key={idx}>{line}</li>
          ))}
        </ul>
        <a
          href={data.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ig-website-link"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
          <span>{data.websiteLabel}</span>
        </a>
        <p className="ig-social-proof">{data.socialProof}</p>
      </div>

      {/* Action Buttons */}
      <div className="ig-actions-row">
        <a
          href={data.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ig-btn ig-btn-primary"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
          <span>Kunjungi Profil ↗</span>
        </a>
        <a
          href={data.dmUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ig-btn ig-btn-secondary"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M22 2L11 13" />
            <path d="M22 2l-7 20-4-9-9-4 20-7z" />
          </svg>
          <span>Kirim Pesan (DM) ↗</span>
        </a>
      </div>

      {/* Story Highlights Bar */}
      {data.highlights && data.highlights.length > 0 && (
        <div className="ig-highlights-container">
          <span className="ig-highlights-title">Sorotan Cerita</span>
          <div className="ig-highlights-list" role="list">
            {data.highlights.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ig-highlight-item"
                role="listitem"
                title={`Lihat sorotan ${item.title}`}
              >
                <div className="ig-highlight-ring">
                  <div className="ig-highlight-thumb">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      width={52}
                      height={52}
                      className="ig-highlight-img"
                    />
                  </div>
                </div>
                <span className="ig-highlight-label">{item.title}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

