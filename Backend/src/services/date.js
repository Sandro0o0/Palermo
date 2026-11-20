const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000;

function getDateFromPreset(preset) {
  if (!preset || typeof preset !== "string") return null;

  const normalized = preset.toLowerCase().trim();
  const now = new Date();

  if (normalized === "lastweek") {
    return new Date(now.getTime() - MS_PER_WEEK);
  }

  if (normalized === "lastday") {
    const d = new Date(now);
    d.setUTCMonth(d.getUTCDay() - 1);
    return d;
  }
  if (normalized === "lastmonth") {
    const d = new Date(now);
    d.setUTCMonth(d.getUTCMonth() - 1);
    return d;
  }

  if (normalized === "lastyear") {
    const d = new Date(now);
    d.setUTCFullYear(d.getUTCFullYear() - 1);
    return d;
  }

  // Fallback: allow passing a real date string in `req.query.date` too
  const parsed = new Date(preset);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function GetFilter(req) {
  const date = getDateFromPreset(req.query.date);

  const ALLOWED_DATE_FIELDS = {
    createdat: "createdAt",
    updatedat: "updatedAt",
  };

  const rawDateType =
    typeof req.query.dateType === "string"
      ? req.query.dateType.trim().toLowerCase()
      : "";

  const dateType = ALLOWED_DATE_FIELDS[rawDateType] || "updatedAt";
  const filter = {};
  if (date) {
    filter[dateType] = { $gt: date };
  }
  return filter;
}

module.exports = { getDateFromPreset, GetFilter };
