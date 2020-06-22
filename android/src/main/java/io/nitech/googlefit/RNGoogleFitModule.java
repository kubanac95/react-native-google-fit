package io.nitech.googlefit;

import android.app.Activity;
import android.content.Context;
import android.content.ContextWrapper;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.common.Scopes;
import com.google.android.gms.common.api.Scope;
import com.google.android.gms.fitness.Fitness;
import com.google.android.gms.fitness.FitnessOptions;
import com.google.android.gms.fitness.data.DataType;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;

import androidx.annotation.NonNull;

import static io.nitech.googlefit.Utils.createScopesArray;

public class RNGoogleFitModule extends ReactContextBaseJavaModule  {
  private static final String TAG = "RNGoogleFit";
  private final RNGoogleFitManager mRNGoogleFitManager;

  public RNGoogleFitModule(ReactApplicationContext reactContext) {
    super(reactContext);

    this.mRNGoogleFitManager = new RNGoogleFitManager();
  }

  @Override
  public String getName() {
    return TAG;
  }

  @ReactMethod
  public void requestPermissions(ReadableArray scopesArray, Promise promise){
    final Scope[] scopes = createScopesArray(scopesArray);

    final Activity activity = getCurrentActivity();

    if (activity == null) {
      promise.resolve(null);
      return;
    }

    FitnessOptions fitnessOptions = FitnessOptions.builder()
      .addDataType(DataType.TYPE_WORKOUT_EXERCISE, FitnessOptions.ACCESS_WRITE)
      .addDataType(DataType.TYPE_ACTIVITY_SEGMENT, FitnessOptions.ACCESS_WRITE)
      .build();

    try {
      mRNGoogleFitManager.requestPermissions(activity, fitnessOptions, promise);
    } catch (Exception e){
      promise.reject(e);
    }
  }

  @ReactMethod
  public void disableFit(final Promise promise){
    final Activity activity = getCurrentActivity();

    if(activity == null){
      promise.resolve(null);
      return;
    }

    Context context = activity.getApplicationContext();

    try {
       Fitness.getConfigClient(activity, GoogleSignIn.getLastSignedInAccount(context)).disableFit()
         .addOnSuccessListener(new OnSuccessListener<Void>() {
           @Override
           public void onSuccess(Void aVoid) {
             promise.resolve(true);
           }
         })
         .addOnFailureListener(new OnFailureListener(){
           @Override
           public void onFailure(@NonNull Exception e) {
             promise.reject(e);
           }
         });
     }
     catch (Exception e){
        promise.reject(e);
     }
  }
}