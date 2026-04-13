const LEGACY_AVATAR_HOSTS = ['avatar.iran.liara.run', 'i.pravatar.cc'];
const DEFAULT_MALE_AVATAR_URL = 'https://api.dicebear.com/7.x/avataaars/svg?seed=boy123&gender=male';
const DEFAULT_FEMALE_AVATAR_URL = 'https://api.dicebear.com/7.x/avataaars/svg?seed=girl123&gender=female';

export const getDefaultAvatarUrl = (gender = 'male') =>
  gender === 'female' ? DEFAULT_FEMALE_AVATAR_URL : DEFAULT_MALE_AVATAR_URL;

const isBlockedAvatarUrl = (url) => {
  if (!url) {
    return true;
  }

  try {
    const parsedUrl = new URL(url);
    return LEGACY_AVATAR_HOSTS.includes(parsedUrl.hostname);
  } catch {
    return true;
  }
};

export const getAvatarUrl = (user) => {
  const normalizedGender = user?.gender === 'female' ? 'female' : user?.gender === 'male' ? 'male' : null;
  const profilePhoto = user?.profilePhoto;

  if (!isBlockedAvatarUrl(profilePhoto)) {
    return profilePhoto;
  }

  return getDefaultAvatarUrl(normalizedGender || 'male');
};

export const getAvatarFallbackUrl = (user) => {
  const normalizedGender = user?.gender === 'female' ? 'female' : 'male';
  return getDefaultAvatarUrl(normalizedGender);
};

export const getSidebarAvatarUrl = (user) => getAvatarUrl(user);
