<template>
     <v-card flat tile width="100%" class="teal text-center">
        <v-footer color="grey darken-2" padless relative>
          <v-card-text class="white--text">
            {{ new Date().getFullYear() }} —
            <strong>
              Cachar College
              <v-avatar tile>
                <v-img src="../assets/logo.png"></v-img>
              </v-avatar>
            </strong>
          </v-card-text>
        </v-footer>
      </v-card>
</template>