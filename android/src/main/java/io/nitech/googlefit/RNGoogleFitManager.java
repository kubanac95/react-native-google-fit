package io.nitech.googlefit;

import android.app.Activity;
import android.content.Intent;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.fitness.FitnessOptions;

import androidx.annotation.NonNull;

public class RNGoogleFitManager implements ActivityEventListener  {
    private final static int GOOGLE_FIT_PERMISSIONS_REQUEST_CODE = 1;

    private Promise permissionPromise;

    public void requestPermissions(@NonNull Activity currentActivity, FitnessOptions fitnessOptions, Promise promise) {
        this.permissionPromise = promise;

        GoogleSignInAccount account = GoogleSignIn.getAccountForExtension(currentActivity.getApplicationContext(), fitnessOptions);

        if (GoogleSignIn.hasPermissions(account, fitnessOptions)) {
            promise.resolve(true);
        } else {
            GoogleSignIn.requestPermissions(currentActivity, GOOGLE_FIT_PERMISSIONS_REQUEST_CODE, account, fitnessOptions);
        }
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (resultCode == Activity.RESULT_OK && requestCode == GOOGLE_FIT_PERMISSIONS_REQUEST_CODE) {
            permissionPromise.resolve(true);
        }
        if (resultCode == Activity.RESULT_CANCELED && requestCode == GOOGLE_FIT_PERMISSIONS_REQUEST_CODE) {
            permissionPromise.resolve(false);
        }
    }
}
