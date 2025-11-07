"use client";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import WidgetV1 from "@/components/widgets/WidgetV1";
import CarouselWidget from "@/components/widgets/CarouselWidget";
import PhotowallWidget from "@/components/widgets/PhotowallWidget";
import TikTokWidget from "@/components/widgets/TikTokWidget";

export default function WidgetsShowcase() {
  return (
    <Container maxWidth="xl" sx={{ py: 8 }}>
      <Box sx={{ mb: 8, textAlign: "center" }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Flowbox Widgets Showcase
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Compare our widget versions and explore different display styles
        </Typography>
      </Box>

      {/* V1 Widget Section */}
      <Box sx={{ mb: 10 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4 }}>
          V1 Widget (Legacy)
        </Typography>
        <WidgetV1 />
      </Box>

      <Divider sx={{ my: 8 }}>
        <Typography variant="overline" color="text.secondary" sx={{ px: 2 }}>
          V2 Widget Examples
        </Typography>
      </Divider>

      {/* V2 Widgets Section */}
      <Box>
        <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4 }}>
          V2 Widgets
        </Typography>
        
        <Grid container spacing={6}>
          <Grid size={12}>
            <Box>
              <Typography variant="h5" component="h3" gutterBottom>
                Carousel Widget
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Horizontal scrolling display perfect for product showcases and testimonials
              </Typography>
              <CarouselWidget />
            </Box>
          </Grid>

          <Grid size={12}>
            <Box>
              <Typography variant="h5" component="h3" gutterBottom>
                Photowall Widget
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Grid-based layout ideal for displaying user-generated content galleries
              </Typography>
              <PhotowallWidget />
            </Box>
          </Grid>

          <Grid size={12}>
            <Box>
              <Typography variant="h5" component="h3" gutterBottom>
                TikTok Widget
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Vertical video feed optimized for TikTok content integration
              </Typography>
              <TikTokWidget />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
