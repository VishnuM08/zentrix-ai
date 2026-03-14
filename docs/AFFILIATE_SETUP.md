# PricePilot AI - Affiliate Marketing Setup Guide

## Overview
PricePilot AI is designed to help you earn through affiliate marketing while providing value to users with AI-powered price comparisons.

## How to Set Up Affiliate Links

### 1. Sign Up for Affiliate Programs

Join the affiliate programs for platforms you want to promote:

**E-Commerce:**
- **Amazon Associates**: https://affiliate.amazon.in/
  - Commission: 1-10% depending on category
  - Cookie duration: 24 hours
  
- **Flipkart Affiliate**: https://affiliate.flipkart.com/
  - Commission: 1-15% depending on category
  - Cookie duration: 24 hours

**Fashion:**
- **Myntra Affiliate Program** (via networks like vCommission, Admitad)
  - Commission: 3-8%
  
- **Ajio Affiliate** (via affiliate networks)
  - Commission: 4-8%

**Beauty:**
- **Nykaa Affiliate** (via networks like CueLinks, vCommission)
  - Commission: 5-10%

**Quick Commerce:**
- Most quick commerce platforms don't have direct affiliate programs yet
- Consider using promotional codes or partnerships

### 2. Update Affiliate Links in Code

Open `/src/app/pages/ProductDetail.tsx` and `/src/app/pages/Cart.tsx`

Find the `getAffiliateLink` function and update with your actual affiliate IDs:

```typescript
const affiliateTags: Record<string, string> = {
  amazon: '?tag=YOUR_AMAZON_AFFILIATE_ID',           // Replace with your Amazon tag
  flipkart: '?affid=YOUR_FLIPKART_AFFILIATE_ID',     // Replace with your Flipkart ID
  myntra: '?ref=YOUR_MYNTRA_AFFILIATE_ID',           // Replace with your Myntra ID
  ajio: '?affid=YOUR_AJIO_AFFILIATE_ID',             // Replace with your Ajio ID
  nykaa: '?ref=YOUR_NYKAA_AFFILIATE_ID',             // Replace with your Nykaa ID
  // Add more as you sign up
};
```

### 3. Add Real Product URLs

Update the `baseUrls` in the same function with actual product URLs:

```typescript
const baseUrls: Record<string, string> = {
  amazon: 'https://amazon.in/dp/',
  flipkart: 'https://flipkart.com/product/',
  myntra: 'https://myntra.com/product/',
  // Add actual URL patterns for each platform
};
```

### 4. Update Product Data

In `/src/app/data/products.ts`, add real product information:

```typescript
{
  id: "1",
  name: "MacBook Air M2",
  // ... other fields
  productUrl: "ACTUAL_PRODUCT_URL",              // Add real product URL
  affiliateLink: "YOUR_AFFILIATE_LINK"           // Optional: pre-generated affiliate link
}
```

## Earning Potential

### Example Commission Structure

For a cart worth ₹100,000:
- **MacBook (₹99,900)** at 3% = ₹2,997
- **Shoes (₹5,999)** at 8% = ₹480
- **Beauty products (₹2,000)** at 10% = ₹200

**Total potential earnings: ₹3,677 per checkout**

### Monthly Revenue Potential

- **100 users/month** × **₹2,000 average cart** × **5% commission** = **₹10,000/month**
- **500 users/month** × **₹3,000 average cart** × **5% commission** = **₹75,000/month**
- **1,000 users/month** × **₹4,000 average cart** × **5% commission** = **₹2,00,000/month**

## Compliance & Disclosure

### Legal Requirements

1. **FTC/Advertising Standards Compliance**
   - Always disclose affiliate relationships
   - We've added disclaimers in the Cart and Product Detail pages

2. **Platform Terms**
   - Follow each platform's affiliate terms of service
   - Don't use incentivized clicks
   - Ensure proper cookie tracking

3. **User Trust**
   - Be transparent about commissions
   - Provide genuine value through AI recommendations
   - Never recommend products solely for higher commissions

## Testing Your Setup

1. **Test Links**: Click affiliate buttons to ensure they redirect properly
2. **Check Tracking**: Use affiliate dashboard to verify clicks are tracked
3. **Cookie Testing**: Clear cookies and test on different devices
4. **Mobile Testing**: Ensure links work on mobile devices

## Advanced Features

### A/B Testing
- Test different button placements
- Experiment with call-to-action text
- Monitor conversion rates

### Analytics Integration
```typescript
// Add Google Analytics or Mixpanel tracking
const trackAffiliateClick = (platform: string, productId: string, price: number) => {
  // Analytics code here
  gtag('event', 'affiliate_click', {
    platform: platform,
    product_id: productId,
    value: price
  });
};
```

### Dynamic Commission Display
Show users how much they're helping you earn (builds trust):
```typescript
const estimatedCommission = price * 0.05; // 5% example
```

## Best Practices

1. **Focus on Value First**: Your AI recommendations should genuinely help users save money
2. **Update Regularly**: Keep product data and prices current
3. **Monitor Performance**: Track which platforms convert best
4. **Optimize User Flow**: Make it easy for users to complete purchases
5. **Build Trust**: Be transparent about affiliate relationships

## Support Platforms

The app currently supports affiliate integrations for:
- ✅ Amazon India
- ✅ Flipkart
- ✅ Myntra
- ✅ Ajio
- ✅ Nykaa
- ⏳ Blinkit (coming soon)
- ⏳ Zepto (coming soon)
- ⏳ Instamart (coming soon)

## Questions?

This setup allows you to:
1. Help users save money with AI-powered recommendations
2. Earn commissions when they purchase through your links
3. Build a sustainable business around price comparison

**Remember**: The better your recommendations, the more users trust you, and the more you'll earn!

---

*PricePilot AI - by Aignite Technologies*
